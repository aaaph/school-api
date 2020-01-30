import { Router } from "express";

import controller from "controllers/progress.controller";
import { uuidMiddleware } from "middlewares/index";

const progressRouter = Router();

progressRouter.get("/", controller.getAll);
progressRouter.get("/:id", uuidMiddleware, controller.getTarget);
progressRouter.post("/", controller.create);
progressRouter.put("/:id", uuidMiddleware, controller.update);
progressRouter.delete("/:id", uuidMiddleware, controller.delete);

export { progressRouter };
