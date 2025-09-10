import { Request, Response } from "express";
import { User } from "../infra/db/models/user";
import logger from "../config/logger";

function generateStringRandom() {
	return crypto.getRandomValues(new Uint8Array(20)).toString().toUpperCase();
}

export async function generateOtpSecret(req: Request, res: Response) {
	const { username } = req.body;
	if (!username) {
		return res.status(400).json({ error: "Falta el username" });
	}
	try {
		const user = await User.findOne({ where: { username } });
		if (!user) {
            throw new Error();
		}
        user.secret = generateStringRandom();
        await user.save();
        return res.status(201).json({ message: "Secreto generado y guardado", secret: user.secret });
	} catch (error) {
		logger.error("Error al generar el secreto:", error);
		return res.status(409).json({ error: "Error al generar el secreto" });
	}
}