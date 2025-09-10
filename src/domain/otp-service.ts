import { User } from "../infra/db/models/user";
import logger from "../config/logger";
import { randomBytes } from "crypto";
let b32 = require('thirty-two');

function generateStringRandom() {
	const secret = randomBytes(20);
	return b32.encode(secret).toString().toUpperCase();
}

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