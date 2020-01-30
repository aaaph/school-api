import { Router } from "express";

import controller from "controllers/school.controller";
import { uuidMiddleware } from "middlewares/index";

import { groupRouter } from "./group.route";

const schoolRouter = Router();

schoolRouter.get("/", controller.getAll);
schoolRouter.get("/:id", uuidMiddleware, controller.getTarget);
schoolRouter.post("/", controller.create);
schoolRouter.put("/:id", uuidMiddleware, controller.update);
schoolRouter.delete("/:id", uuidMiddleware, controller.del);

schoolRouter.use("/:id/group", uuidMiddleware, controller.targetMiddleware, groupRouter);

export { schoolRouter };
