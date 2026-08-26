import { BugRepository } from "./bug-repository.js";

import type { AnalyzeBugType } from "./bug-schema.js";

export class BugService {
  constructor(private readonly repository: BugRepository) {}
  async analyzeBug(bugData: AnalyzeBugType) {
    const orginalBug = await this.repository.saveOrginalBugData(bugData);
    return orginalBug;
  }
}
