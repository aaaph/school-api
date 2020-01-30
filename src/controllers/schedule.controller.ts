import { Response, NextFunction } from "express";
import { ITeacherRequest, IGroupRequest } from "types/express";

import { TeacherCrud, DisciplineCrud, GroupCrud, ScheduleCrud as crud } from "db/index";
import { uuidValidator } from "helpers/index";
import { ILessonBody } from "types/body";

export default class ScheduleService {
   //#region teacher
   public static async teacherSchedule(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         const all = await crud.selectAllByTeacher(req.teacher);
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async teacherLesson(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectLessonByTeacher(req.params.id, req.teacher);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }
   public static async addTeacherLesson(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         //indput group id , lessonTitle, day, lessonNumber
         const groupId = uuidValidator(req.body.group);
         const group = await GroupCrud.selectTarget(groupId, req.school);

         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, group.course);
         const body: ILessonBody = {
            day: parseInt(req.body.day),
            lessonNumber: parseInt(req.body.lessonNumber),
            discipline,
         };

         if (!(await req.teacher.isMatchDiscipline(discipline))) {
            await next({ status: 400, message: "discipline doesn't match by teacher" }); //kastil
         } else if (req.school.days < body.day) {
            await next({ status: 400, message: `impossible add lesson on the ${body.day}th week day at a ${req.school.days}-day school ` }); //kastil
         } else {
            const saved = await crud.insertByTeacher(group, req.teacher, body);
            res.status(201).send(saved);
         }
      } catch (err) {
         await next(err);
      }
   }
   public static async updateTeacherLesson(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         const groupId = uuidValidator(req.body.group);
         const group = await GroupCrud.selectTarget(groupId, req.school);

         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, group.course);
         const body: ILessonBody = {
            day: parseInt(req.body.day),
            lessonNumber: parseInt(req.body.lessonNumber),
            discipline,
         };

         if (!(await req.teacher.isMatchDiscipline(discipline))) {
            await next({ status: 400, message: "discipline doesn't match by teacher" }); //kastil
         } else if (req.school.days < body.day) {
            await next({ status: 400, message: `impossible add lesson on the ${body.day}th week day at a ${req.school.days}-day school ` }); //kastil
         } else {
            const saved = await crud.updateByTeacher(req.params.id, group, req.teacher, body);
            res.status(201).send(saved);
         }
      } catch (err) {
         await next(err);
      }
   }
   public static async deleteTeacherLesson(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         const removed = await crud.deleteByTeacher(req.params.id, req.teacher);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   //#endregion teacher
   //#region group
   public static async groupSchedule(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const all = await crud.selectAllByGroup(req.group);
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async groupLesson(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectlessonByGroup(req.params.id, req.group);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }
   public static async addGroupLesson(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         //input lessonNumber, day, disciplineName, teacherId..

         const teacherId = uuidValidator(req.body.teacher);
         const teacher = await TeacherCrud.selectTarget(teacherId, req.school);

         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, req.group.course);

         const body: ILessonBody = {
            day: parseInt(req.body.day),
            lessonNumber: parseInt(req.body.lessonNumber),
            discipline,
         };

         if (!(await teacher.isMatchDiscipline(discipline))) {
            await next({ status: 400, message: "discipline doesn't match by teacher" }); //kastil
         } else if (req.school.days < body.day) {
            await next({ status: 400, message: `impossible add lesson on the ${body.day}th week day at a ${req.school.days}-day school ` }); //kastil
         } else {
            const saved = await crud.insertByGroup(req.group, teacher, body);
            res.status(201).send(saved);
         }
      } catch (err) {
         await next(err);
      }
   }
   public static async updateGroupLesson(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const teacherId = uuidValidator(req.body.teacher);
         const teacher = await TeacherCrud.selectTarget(teacherId, req.school);

         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, req.group.course);

         const body: ILessonBody = {
            day: parseInt(req.body.day),
            lessonNumber: parseInt(req.body.lessonNumber),
            discipline,
         };

         if (!(await teacher.isMatchDiscipline(discipline))) {
            await next({ status: 400, message: "discipline doesn't match by teacher" }); //kastil
         } else if (req.school.days < body.day) {
            await next({ status: 400, message: `impossible add lesson on the ${body.day}th week day at a ${req.school.days}-day school ` }); //kastil
         } else {
            const updated = await crud.updateByGroup(req.params.id, req.group, teacher, body);
            res.status(200).send(updated);
         }
      } catch (err) {
         await next(err);
      }
   }
   public static async deleteGroupLesson(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const removed = await crud.deleteByGroup(req.params.i, req.group);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   //#endregion group
}
