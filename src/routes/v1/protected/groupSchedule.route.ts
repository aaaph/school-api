import { Router } from "express";

import controller from "controllers/schedule.controller";
import { uuidMiddleware } from "middlewares/index";

const groupSchedule = Router();

groupSchedule.get("/", controller.groupSchedule);

groupSchedule.get("/:id", uuidMiddleware, controller.groupLesson);

groupSchedule.post("/", controller.addGroupLesson);

groupSchedule.put("/:id", uuidMiddleware, controller.updateGroupLesson);

groupSchedule.delete("/:id", uuidMiddleware, controller.deleteGroupLesson);

export { groupSchedule };
