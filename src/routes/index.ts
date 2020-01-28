import { Router, Request, Response, NextFunction } from "express";
import { v1 } from "./v1";

const rootRouter = Router();

rootRouter.use("/v1", v1);

export { rootRouter as router };
