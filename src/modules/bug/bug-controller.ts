import type { Request, Response, NextFunction } from "express";
import type { AnalyzeBugType } from "./bug-schema.js";

import { BugService } from "./bug-service.js";

export class BugController {
  constructor(private readonly service: BugService) {}
  async analyzeBug(req: Request, res: Response, next: NextFunction) {
    try {
      const bugData: AnalyzeBugType = req.body;
      const analysisResult = await this.service.analyzeBug(bugData);
      res.status(200).json(analysisResult);
    } catch (error) {
      next(error);
    }
  }
}
