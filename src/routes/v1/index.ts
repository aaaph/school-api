import { Router } from "express";

import { authRouter } from "./auth.route";
import { protectedRouter } from "./protected";

const v1 = Router();

v1.use("/auth", authRouter);
v1.use(
  "/",
  (req, res, next) => {
    console.log("check session middleware");
    next();
  },
  protectedRouter
);

export { v1 };
