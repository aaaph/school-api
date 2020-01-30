import { Router } from "express";

import { studentRouter } from "./student.route";
import { uuidMiddleware } from "middlewares/index";
import controller from "controllers/group.controller";

const groupRouter = Router();

groupRouter.get("/", controller.getAll);
groupRouter.get("/:id", uuidMiddleware, controller.getTarget);
groupRouter.post("/", controller.create);
groupRouter.put("/:id", uuidMiddleware, controller.update);
groupRouter.delete("/:id", uuidMiddleware, controller.del);

groupRouter.use("/:id/student", uuidMiddleware, controller.targetMiddleware, studentRouter);

export { groupRouter };
