import { Router } from "express";
import validate from "../../middlewares/validate.js";
import { originalBugSchema } from "./bug-schema.js";
import { BugController } from "./bug-controller.js";
import { BugService } from "./bug-service.js";
import { BugRepository } from "./bug-repository.js";

const router = Router();

const repository = new BugRepository();
const service = new BugService(repository);
const controller = new BugController(service);

router.post("/analyze", validate(originalBugSchema), (req, res, next) =>
  controller.analyzeBug(req, res, next),
);

export default router;
