import QRCode from "qrcode";

/**
 * Generate a QR code URI for OTP authentication.
 * @param secret - The OTP secret key
 * @param account - The account name or email
 * @param issuer - The issuer name (e.g., your app name)
 * @returns A buffer containing the QR code image
 */
export async function generateQrUri(secret: string, account: string, issuer: string) {
  // Standard URL otpauth:// for Google Authenticator
  const otpauthUrl = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}`;

  const qrImage = await QRCode.toDataURL(otpauthUrl);
  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  const imgBuffer = Buffer.from(base64Data, "base64");
  return imgBuffer;
}
