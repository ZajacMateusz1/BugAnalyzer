import { Router } from "express";
import gemini from "../../config/gemini.js";
import pool from "../../config/postgres.js";
import validate from "../../middlewares/validate.js";
import { originalBugSchema } from "./bug-schema.js";
import { BugController } from "./bug-controller.js";
import { BugService } from "./bug-service.js";
import { GeminiService } from "./gemini-service.js";
import { BugRepository } from "./bug-repository.js";

const router = Router();

const repository = new BugRepository(pool);
const geminiService = new GeminiService(gemini);
const service = new BugService(repository, geminiService);
const controller = new BugController(service);

router.get("/", (req, res, next) => controller.getBugs(req, res, next));
router.post("/analyze", validate(originalBugSchema), (req, res, next) =>
  controller.analyzeBug(req, res, next),
);

export default router;
