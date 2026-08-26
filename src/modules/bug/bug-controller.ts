import type { Request, Response, NextFunction } from "express";
import type { originalBugType } from "./bug-schema.js";

import type { BugService } from "./bug-service.js";

export class BugController {
  constructor(private readonly service: BugService) {}
  async analyzeBug(req: Request, res: Response, next: NextFunction) {
    try {
      const bugData: originalBugType = req.body;
      const analysisResult = await this.service.analyzeBug(bugData);
      res.status(200).json(analysisResult);
    } catch (error) {
      next(error);
    }
  }
  async getBugs(req: Request, res: Response, next: NextFunction) {
    try {
      const bugs = await this.service.getBugs();
      res.status(200).json(bugs);
    } catch (error) {
      next(error);
    }
  }
}
