import { Request } from "express";
import { generateOtpSecret } from "../../domain/otp-service";

export async function registerOtpSecret(req: Request) {
  const username: any = req.body.username;
  const secret = await generateOtpSecret(username);

  return { username, secret };
}
