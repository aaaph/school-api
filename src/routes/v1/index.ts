import { Router } from "express";

import { authRouter } from "./auth.route";
import { protectedRouter } from "./protected";

import { SessionMiddleware } from "middlewares/index";

const v1 = Router();

v1.use("/auth", authRouter);
v1.use("/", SessionMiddleware.jwt, protectedRouter);

export { v1 };
