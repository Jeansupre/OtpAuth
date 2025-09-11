import { Request } from "express";
import { generateOtpSecret } from "../../domain/otp-service";

/**
 * Registers a new OTP secret for a user.
 * @param req - Express request object containing the username in the body
 * @returns An object containing the username and the generated OTP secret
 */
export async function registerOtpSecret(req: Request) {
  const username: any = req.body.username;
  const secret = await generateOtpSecret(username);

  return { username, secret };
}
