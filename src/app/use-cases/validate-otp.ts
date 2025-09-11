import { Request } from "express";
import { validateOtpCode } from "../../domain/otp-service";

/**
 * Validates the OTP code for a user during login.
 * @param req - The request object containing user credentials.
 * @returns True if the login is successful, false otherwise.
 */
export async function loginWithOtpCode(req: Request): Promise<boolean> {
    const { username, code } = req.body;
    return await validateOtpCode(username, code);
}
