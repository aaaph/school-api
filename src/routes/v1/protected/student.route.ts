import { Router } from "express";

import { uuidMiddleware } from "middlewares/index";
import controller from "controllers/student.controller";

import { progressRouter } from "./progress.route";

const studentRouter = Router();

studentRouter.get("/", controller.getAll);
studentRouter.get("/:id", uuidMiddleware, controller.getTarget);
studentRouter.post("/", controller.create);
studentRouter.put("/:id", uuidMiddleware, controller.update);
studentRouter.delete("/:id", uuidMiddleware, controller.del);

studentRouter.use("/:id/progress", uuidMiddleware, controller.targetMiddleware, progressRouter);

export { studentRouter };
