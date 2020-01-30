import { Router } from "express";

import { uuidMiddleware } from "middlewares/index";
import controller from "controllers/student.controller";

const studentRouter = Router();

studentRouter.get("/", controller.getAll);
studentRouter.get(":id/", uuidMiddleware, controller.getTarget);
studentRouter.get("/", controller.create);
studentRouter.get(":id/", uuidMiddleware, controller.update);
studentRouter.get(":id/", uuidMiddleware, controller.del);

export { studentRouter };
