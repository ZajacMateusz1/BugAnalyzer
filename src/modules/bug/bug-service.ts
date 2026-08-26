import type { GeminiService } from "./gemini-service.js";
import type { BugRepository } from "./bug-repository.js";

import type { originalBugType } from "./bug-schema.js";

export class BugService {
  constructor(
    private readonly repository: BugRepository,
    private readonly geminiService: GeminiService,
  ) {}
  async analyzeBug(originalBugData: originalBugType) {
    const analysisResult = await this.geminiService.analyzeBug(originalBugData);
    const response = await this.repository.saveBugWithAnalysis(
      originalBugData,
      analysisResult,
    );
    return response;
  }
  async getBugs() {
    const bugs = await this.repository.getBugsWithAnalysis();
    return bugs;
  }
}
