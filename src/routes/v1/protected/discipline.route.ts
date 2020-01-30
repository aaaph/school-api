import { Router } from "express";

import controller from "controllers/discipline.controller";
import { uuidMiddleware } from "middlewares/index";
const discRouter = Router();

discRouter.get("/", controller.getAll);
discRouter.get("/:id", uuidMiddleware, controller.getTarget);
discRouter.post("/", controller.create);
discRouter.put("/:id", uuidMiddleware, controller.update);
discRouter.delete("/:id", uuidMiddleware, controller.del);

export { discRouter };
