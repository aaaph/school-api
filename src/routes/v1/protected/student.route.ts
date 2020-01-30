import { Router } from "express";

import { uuidMiddleware } from "middlewares/index";
import controller from "controllers/student.controller";
const studentRouter = Router();

studentRouter.get("/", controller.getAll);
studentRouter.get("/:id", uuidMiddleware, controller.getTarget);
studentRouter.post("/", controller.create);
studentRouter.put("/:id", uuidMiddleware, controller.update);
studentRouter.delete("/:id", uuidMiddleware, controller.del);

export { studentRouter };
