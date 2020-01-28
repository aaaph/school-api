import { Router } from "express";
import { schoolRouter } from "./school.route";

const protectedRouter = Router();

protectedRouter.use("/school", schoolRouter);

export { protectedRouter };
