/**
  'EXPO_PUBLIC_*' vars are inlined into the JS bundle at build time, so NEVER put
  real secrets here. Savia has no backend yet, so the values default to placeholders
  and the app boots without a '.env'
*/
import { z } from "zod";

const envSchema = z.object({
  API_BASE_URL: z.string().url().default("https://api.savia.local"),
  API_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),
  // How long the app may stay in background before the session locks
  AUTO_LOCK_MS: z.coerce.number().int().positive().default(60_000),
  ENVIRONMENT: z
    .enum(["development", "staging", "production"])
    .default("development"),
});

const parsed = envSchema.safeParse({
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  API_TIMEOUT_MS: process.env.EXPO_PUBLIC_API_TIMEOUT_MS,
  AUTO_LOCK_MS: process.env.EXPO_PUBLIC_AUTO_LOCK_MS,
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT,
});

if (!parsed.success) {
  // Crash loudly in dev so misconfiguration never reaches a build
  console.error("Invalid env:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;
