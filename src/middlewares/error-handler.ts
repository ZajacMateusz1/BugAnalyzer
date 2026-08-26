import type { Request, Response, NextFunction } from "express";
import mapToHttpError from "../utils/error-map.js";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }
  console.error(error);
  const mappedError = mapToHttpError(error);
  res.status(mappedError.statusCode).json({ message: mappedError.message });
};
export default errorHandler;
