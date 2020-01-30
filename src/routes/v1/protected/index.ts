import { Router } from "express";
import { schoolRouter } from "./school.route";
import { discRouter } from "./discipline.route";

const protectedRouter = Router();

protectedRouter.use("/school", schoolRouter);
protectedRouter.use("/discipline", discRouter);

export { protectedRouter };
