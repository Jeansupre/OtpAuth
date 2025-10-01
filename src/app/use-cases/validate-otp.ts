import { Request } from "express";
import { validateOtpCode } from "../../domain/otp-service";
import logger from "../../config/logger";

/**
 * Validates the OTP code for a user during login.
 * @param req - The request object containing user credentials.
 * @returns True if the login is successful, false otherwise.
 */
export async function loginWithOtpCode(req: Request): Promise<boolean | null> {
    const { username, code } = req.body;
    try {
        return await validateOtpCode(username, code);
    } catch (error) {
        logger.error("Error during OTP validation:", error);
        return false;
    }
}
