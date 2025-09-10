import { Router } from "express";
import logger from "../../../config/logger";

const router = Router();

// Registro de usuario → genera secreto y QR
router.post("/register", async (req, res) => {
    const { account = "user@example.com", issuer = "OtpAuthApp" } = req.body;

    //   const { secret } = generateOtpSecret();
    //   const { otpauthUrl, qrImage } = await generateQrUri(secret, account, issuer);

    res.json({ });
});

// Login → valida OTP
router.post("/login", (req, res) => {
    logger.info("Hace algo");
    const { secret, code } = req.body;
    if (!secret || !code) return res.status(400).json({ error: "Datos faltantes" });

    //   const isValid = validateOtpCode(secret, code);
    //   if (!isValid) return res.status(401).json({ success: false });

    res.json({ success: true });
});

export default router;
