import type { Request, Response, NextFunction } from "express";
import HttpError from "../errors/HttpError.js";

import { env } from "../config/env.js";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token !== env.SECRET_KEY) {
      throw new HttpError("Unauthorized", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkAuth;
