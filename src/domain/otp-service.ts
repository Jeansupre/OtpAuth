import { User } from "../infra/db/models/user";
import logger from "../config/logger";
import { randomBytes, createHmac } from "crypto";
let b32 = require('thirty-two');

/**
* Generate a random base32 string.
* @returns A random base32 string
*/
function generateStringRandom() {
  const secret = randomBytes(20);
  return b32.encode(secret).toString().replace(/=+$/, "").toUpperCase();
}

/**
* Retrieves or generates a secret key for OTP generation associated with a user.
*
* @remarks
* - If the user already has a secret, it is returned.
* - If the user does not have a secret, a new one is generated, saved, and then returned.
*
* @param username - The username of the user.
* @returns The secret key associated with the user.
*
* @throws {Error} If the username is missing.
* @throws {Error} If the user is not found in the database.
*/
export async function generateOtpSecret(username: string) {
  try {
    if (!username) {
      logger.error("Missing username");
      throw new Error("Missing username");
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      logger.error("User not found");
            throw new Error("User not found");
    }
    if (!user.secret_otp) {
      user.secret_otp = generateStringRandom();
      await user.save();
    }
    return user.secret_otp;
  } catch (error) {
    logger.error("Error while generating the secret key:", error);
    throw error;
  }
}

/**
 * Validates the OTP code for a user.
 * @param username - The username of the user.
 * @param code - The OTP code to validate.
 * @returns True if the OTP code is valid, false otherwise.
 */
export async function validateOtpCode(username: string, code: string): Promise<boolean> {
    try {
        if (!username || !code) {
            logger.error("Missing data");
            throw new Error("Missing data");
        }
        const user = await User.findOne({ where: { username } });
        if (!user?.secret_otp) {
            logger.error("User not found or secret not set");
            throw new Error("User not found or secret not set");
        }
        return validateOtpCodeGenerated(user.secret_otp, code);
    } catch (error) {
        logger.error("Error validating OTP code:", error);
        throw new Error("Error validating OTP code");
    }
}

/**
 * Validates a code entered by the user against the one generated using their secret key.
 * @param secret - The user's secret key
 * @param code - The OTP code to validate
 * @returns True if the OTP code is valid, false otherwise
 */
function validateOtpCodeGenerated(secret: string, code: string): boolean {
  const currentInterval = Math.floor(Date.now() / 30000);
  for (let i = -1; i <= 1; i++) {
    let counterInterval = counter(currentInterval + i);
    const otp = createOtpCode(secret, counterInterval);
    if (otp === code) {
      return true;
    }
  }
  return false;
}

/**
  * Create a 6-digit OTP code based on a user's secret.
  * @param secretUser - The user's secret key
  * @param counter - The counter value in Buffer format
  * @returns A 6-digit OTP code
  */
function createOtpCode(secretUser: string, counter: Buffer): string {
  const hash = generateHmacSha1(secretUser, counter);
  const dynamicBinary = dynamicTruncation(hash);
  return reduceToOtpDigits(dynamicBinary);
}

/**
  * Generate an HMAC-SHA1 hash from a secret key.
  * @param secret - The secret key
  * @param counter - The counter value in Buffer format
  * @returns HMAC-SHA1 hash in Buffer format
  */
function generateHmacSha1(secret: string, counter: Buffer): Buffer {
  const key = b32.decode(secret);
  const hmac = createHmac('sha1', key);
  hmac.update(counter);
  return hmac.digest();
}

/**
 * Generates a counter value for OTP generation.
 * @param dateInMs - The date in milliseconds
 * @returns A Buffer based in the date in milliseconds representing the counter value
 */
function counter(dateInMs: number): Buffer {
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(BigInt(dateInMs)); 
  return buffer;
}

/**
  * Truncate a hash dynamically to extract a binary code.
  * @param hash - The hash in Buffer format
  * @returns The extracted binary code as a number
  * @throws {Error} If the hash is invalid or too short
  */ 
function dynamicTruncation(hash: Buffer): number {
  if (!hash || hash.length < 4) {
    throw new Error("Invalid hash or too short");
  }

  try {
    const offset = hash[hash.length - 1]! & 0xf;
    return (
      ((hash[offset]! & 0x7f) << 24) |
      ((hash[offset + 1]! & 0xff) << 16) |
      ((hash[offset + 2]! & 0xff) << 8) |
      (hash[offset + 3]! & 0xff)
    );
  } catch (error) {
    logger.error("Error in dynamicTruncation:", error);
    throw error;
  }
}

/**
  * Reduce a binary code to a 6-digit OTP code.
  * @param binaryCode - The binary code
  * @returns A 6-digit OTP code
  */
function reduceToOtpDigits(binaryCode: number): string {
  const modulus = Math.pow(10, 6);
  return (binaryCode % modulus).toString().padStart(6, '0');
}