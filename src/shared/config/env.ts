import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();
const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	PORT: z.string().regex(/^\d+$/).transform(Number).default("3000"),
	DATABASE_URL: z.string(),
	CORS_ORIGIN: z.string().default("*"),
	DB_NAME: z.string(),
	RATE_LIMIT_WINDOW: z
		.string()
		.regex(/^\d+$/)
		.transform(Number)
		.default((15 * 60 * 1000).toString()), // 15 minutes
	RATE_LIMIT_MAX: z.string().regex(/^\d+$/).transform(Number).default("100"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
	try {
		return envSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const missingVars = error.errors.map(
				err => `${err.path.join(".")}: ${err.message}`,
			);
			throw new Error(
				`❌ Environment Variables Error:\n${missingVars.join("\n")}`,
			);
		}
		throw error;
	}
}

export const ENV = validateEnv();
