import { z } from "zod";

export const originalBugSchema = z.object({
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

export type originalBugType = z.infer<typeof originalBugSchema>;

export const analyzeBugSchema = z.object({
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  category: z.enum([
    "DATABASE",
    "API",
    "AUTH",
    "CONFIGURATION",
    "EXTERNAL_SERVICE",
    "UNKNOWN",
  ]),
  probableCause: z.string().min(1),
  suggestedFix: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

export const analyzeBugJSONSchema = z.toJSONSchema(analyzeBugSchema);

export type analyzeBugType = z.infer<typeof analyzeBugSchema>;
