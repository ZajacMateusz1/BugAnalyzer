import { z } from "zod";

export const analyzeBugSchema = z.object({
  service: z
    .string()
    .min(1, { error: "Service is required" })
    .max(100, { error: "Service must be at most 100 characters" }),
  method: z
    .string()
    .min(1, { error: "Method is required" })
    .max(100, { error: "Method must be at most 100 characters" }),
  path: z
    .string()
    .min(1, { error: "Path is required" })
    .max(255, { error: "Path must be at most 255 characters" }),
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(255, { error: "Name must be at most 255 characters" }),
  message: z.string().min(1, { error: "Message is required" }),
  stack: z
    .string()
    .max(10000, { error: "Stack must be at most 10000 characters" })
    .optional(),
});

export type AnalyzeBugType = z.infer<typeof analyzeBugSchema>;
