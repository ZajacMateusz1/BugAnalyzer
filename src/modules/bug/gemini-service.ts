import type { GoogleGenAI } from "@google/genai";

import HttpError from "../../errors/HttpError.js";

import {
  type originalBugType,
  analyzeBugSchema,
  analyzeBugJSONSchema,
} from "./bug-schema.js";

const PROMPT = `You are a professional backend error analyzer.
Analyze the provided backend error and return a structured response.

Your task:
1. Determine the most likely category of the error.
2. Determine its priority based on potential impact.
3. Identify the most probable root cause.
4. Suggest a practical fix.
5. Estimate your confidence in the analysis.

Rules:
- Analyze only the information provided in the bug report.
- Do not invent missing information.
- If the root cause cannot be determined reliably, state that in probableCause.
- Prefer the most likely explanation rather than listing many possibilities.
- The suggestedFix should be specific and actionable.
- Confidence must be between 0 and 1.
- Treat the priority as:
  P1 = critical functionality is unavailable or the application is severely affected.
  P2 = important functionality is broken or significantly degraded.
  P3 = limited impact or a workaround exists.
  P4 = minor issue with low impact.
  
Available categories:
- DATABASE
- API
- AUTH
- BUSINESS_LOGIC
- EXTERNAL_SERVICE
- CONFIGURATION
- UNKNOWN

Bug report:`;

export class GeminiService {
  constructor(private readonly gemini: GoogleGenAI) {}
  async analyzeBug(bugData: originalBugType) {
    const interaction = await this.gemini.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: `${PROMPT} ${JSON.stringify(bugData)}`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: analyzeBugJSONSchema,
      },
    });
    const geminiOutput = interaction.output_text;
    if (!geminiOutput) {
      throw new HttpError("Gemini output is empty", 500);
    }
    const analysisResult = analyzeBugSchema.parse(JSON.parse(geminiOutput));
    return analysisResult;
  }
}
