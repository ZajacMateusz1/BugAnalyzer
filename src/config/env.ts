import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().transform((value) => Number(value) || 3000),
  POSTGRES_HOST: z.string().min(1, { error: "POSTGRES_HOST is required" }),
  POSTGRES_PORT: z.string().transform((value) => Number(value) || 5432),
  POSTGRES_DATABASE: z
    .string()
    .min(1, { error: "POSTGRES_DATABASE is required" }),
  POSTGRES_USER: z.string().min(1, { error: "POSTGRES_USER is required" }),
  POSTGRES_PASSWORD: z
    .string()
    .min(1, { error: "POSTGRES_PASSWORD is required" }),
  GEMINI_API_KEY: z.string().min(1, { error: "Gemini_API_KEY is required" }),
});

export const env = envSchema.parse(process.env);
