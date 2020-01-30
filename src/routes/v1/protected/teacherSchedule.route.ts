import { Router } from "express";
import controller from "controllers/schedule.controller";
import { uuidMiddleware } from "middlewares/index";
const teacherSchedule = Router();

teacherSchedule.get('/', controller.teacherSchedule)
teacherSchedule.get('/:id',uuidMiddleware,controller.teacherSchedule)
teacherSchedule.post('/', controller.teacherSchedule)
teacherSchedule.put('/:id',uuidMiddleware, controller.teacherSchedule)
teacherSchedule.delete('/:id',uuidMiddleware, controller.teacherSchedule)

export { teacherSchedule };
