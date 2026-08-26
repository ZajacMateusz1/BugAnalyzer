import express from "express";
import HttpError from "./errors/HttpError.js";
import errorHandler from "./middlewares/error-handler.js";

import bugRoutes from "./modules/bug/bug-routes.js";

const app = express();

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/bugs", bugRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find that route.", 404));
});

app.use(errorHandler);

export default app;
