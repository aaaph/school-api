import { Router } from "express";

import controller from "controllers/school.controller";
import { uuidMiddleware } from "middlewares/index";

const schoolRouter = Router();

schoolRouter.get("/", controller.getAll);
schoolRouter.get("/:id", uuidMiddleware, controller.getTarget);
schoolRouter.post("/", controller.create);
schoolRouter.put("/:id", uuidMiddleware, controller.update);
schoolRouter.delete("/:id", uuidMiddleware, controller.del);

export { schoolRouter };
