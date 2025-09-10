import { Router } from "express";
import logger from "../../../config/logger";
import { generateQrUri } from "../../qr/qr-generate";
import { registerOtpSecret } from "../../../app/use-cases/generate-secret";

const router = Router();

// Registro de usuario → genera secreto y QR
router.post("/register", async (req, res) => {

    const { username, secret } = await registerOtpSecret(req);
    const qrImage = await generateQrUri(secret, username, "MyApp");

    res.set("Content-Type", "image/png");
    res.send(qrImage);
});

// Login → valida OTP
router.post("/login", (req, res) => {
    logger.info("Hace algo");
    const { secret, code } = req.body;
    if (!secret || !code) return res.status(400).json({ error: "Missing data" });

    //   const isValid = validateOtpCode(secret, code);
    //   if (!isValid) return res.status(401).json({ success: false });

    res.json({ success: true });
});

export default router;
