import type { Pool } from "pg";

import type { originalBugType, analyzeBugType } from "./bug-schema.js";

export class BugRepository {
  constructor(private readonly pool: Pool) {}

  async saveBugWithAnalysis(
    originalBugData: originalBugType,
    analyzeBug: analyzeBugType,
  ) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");

      const savedBug = await client.query(
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

      const savedAnalysis = await client.query(
        "INSERT INTO bug_analysis (bug_id, priority, category, probable_cause, suggested_fix, confidence) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [
          savedBug.rows[0].id,
          analyzeBug.priority,
          analyzeBug.category,
          analyzeBug.probableCause,
          analyzeBug.suggestedFix,
          analyzeBug.confidence,
        ],
      );

      await client.query("COMMIT");

      return {
        bugId: savedBug.rows[0].id,
        analysisId: savedAnalysis.rows[0].id,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getBugsWithAnalysis() {
    const result = await this.pool.query(
      "SELECT * FROM bugs JOIN bug_analysis ON bugs.id = bug_analysis.bug_id",
    );
    return result.rows;
  }
}
