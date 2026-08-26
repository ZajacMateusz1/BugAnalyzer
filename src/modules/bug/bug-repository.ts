import pool from "../../config/postgres.js";

import type { AnalyzeBugType } from "./bug-schema.js";

export class BugRepository {
  async saveOrginalBugData(bugData: AnalyzeBugType) {
    const savedBug = await pool.query(
      "INSERT INTO bugs (service, method, path, name, message, stack) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        bugData.service,
        bugData.method,
        bugData.path,
        bugData.name,
        bugData.message,
        bugData.stack,
      ],
    );
    return savedBug.rows[0];
  }
}
