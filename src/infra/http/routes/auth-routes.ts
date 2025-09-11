import { Router } from "express";
import { generateQrUri } from "../../qr/qr-generate";
import { registerOtpSecret } from "../../../app/use-cases/generate-secret";
import { loginWithOtpCode } from "../../../app/use-cases/validate-otp";

const router = Router();

// Register → generate OTP secret and QR
router.post("/register", async (req, res) => {

    const { username, secret } = await registerOtpSecret(req);
    const qrImage = await generateQrUri(secret, username, "MyApp");

    res.set("Content-Type", "image/png");
    res.send(qrImage);
});

// Login → validate OTP
router.post("/login", async (req, res) => {

    const isValid = await loginWithOtpCode(req);
    if (!isValid) return res.status(401).json({ success: false });

    res.json({ success: true });
});

export default router;
