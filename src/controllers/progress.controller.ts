import { Response, NextFunction } from "express";
import { IStudentRequest } from "types/express";

import { ProgressCrud as crud, DisciplineCrud } from "db/index";
import { IProgressBody } from "types/body";

export default class ProgressService {
   public static async getAll(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         const all = await crud.getAllByStudent(req.student);
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         const target = await crud.getTargetByStudent(req.params.id, req.student);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }
   public static async create(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         //indput rating + desciplineTitle
         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, req.group.course);
         const body: IProgressBody = {
            rating: parseInt(req.body.rating),
            discipline,
         };
         const saved = await crud.createForStudent(req.student, body);
         res.status(201).send(saved);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         const discipline = await DisciplineCrud.selectByTitleAndCourse(req.body.lessonTitle, req.group.course);
         const body: IProgressBody = {
            rating: parseInt(req.body.rating),
            discipline,
         };
         const saved = await crud.updateForStudent(req.params.id, req.student, body);
         res.status(201).send(saved);
      } catch (err) {
         await next(err);
      }
   }
   public static async delete(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         const removed = await crud.deleForStudent(req.params.id, req.student);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
}
