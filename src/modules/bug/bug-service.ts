import HttpError from "../../errors/HttpError.js";

import type { GeminiService } from "./gemini-service.js";
import type { BugRepository } from "./bug-repository.js";

import {
  type originalBugType,
  analyzeBugSchema,
  analyzeBugJSONSchema,
} from "./bug-schema.js";

export class BugService {
  constructor(
    private readonly repository: BugRepository,
    private readonly geminiService: GeminiService,
  ) {}
  async analyzeBug(bugData: originalBugType) {
    const orginalBug = await this.repository.saveOrginalBugData(bugData);
    const analysisResult = await this.geminiService.analyzeBug(bugData);
    return analysisResult;
  }
}
