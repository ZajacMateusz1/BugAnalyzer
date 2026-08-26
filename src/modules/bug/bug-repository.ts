import type { Pool } from "pg";

import type { originalBugType, analyzeBugType } from "./bug-schema.js";

export class BugRepository {
  constructor(private readonly pool: Pool) {}
  async saveOrginalBugData(originalBugData: originalBugType) {
    const savedBug = await this.pool.query(
      "INSERT INTO bugs (service, method, path, name, message, stack) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        originalBugData.service,
        originalBugData.method,
        originalBugData.path,
        originalBugData.name,
        originalBugData.message,
        originalBugData.stack,
      ],
    );
    return savedBug.rows[0];
  }
  async saveAnalyzedBugData(bugId: number, analyzeBug: analyzeBugType) {
    const savedAnalysis = await this.pool.query(
      "INSERT INTO bug_analysis (bug_id, priority, category, probable_cause, suggested_fix, confidence) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        bugId,
        analyzeBug.priority,
        analyzeBug.category,
        analyzeBug.probableCause,
        analyzeBug.suggestedFix,
        analyzeBug.confidence,
      ],
    );
    return savedAnalysis.rows[0];
  }
  async getBugsWithAnalysis() {
    const result = await this.pool.query(
      "SELECT * FROM bugs JOIN bug_analysis ON bugs.id = bug_analysis.bug_id",
    );
    return result.rows;
  }
}
