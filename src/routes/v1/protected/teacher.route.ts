import { Router } from "express";

import controller from "controllers/teacher.controller";
import { uuidMiddleware } from "middlewares/index";

import { teacherSchedule as scheduleRouter } from "./teacherSchedule.route";

const teacherRouter = Router();

teacherRouter.get("/", controller.getAll);
teacherRouter.get("/:id", uuidMiddleware, controller.getTarget);
teacherRouter.post("/", controller.create);
teacherRouter.put("/:id", uuidMiddleware, controller.update);
teacherRouter.delete("/:id", uuidMiddleware, controller.del);

teacherRouter.use("/:id/schedule", uuidMiddleware, controller.targetMiddleware, scheduleRouter);

export { teacherRouter };
