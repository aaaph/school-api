import { Response, NextFunction } from "express";
import { ISchoolRequst, ITeacherRequest } from "types/express";

import { stringToArray } from "helpers/index";
import { DisciplineCrud, TeacherCrud as crud } from "db/index";

export default class TeacherService {
   public static async getAll(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const all = await crud.selectAll(req.school);
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectTarget(req.params.id, req.school);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }
   public static async create(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         //input arr with id's disciplines
         const age = parseInt(req.body.age);

         const ids = await stringToArray(req.body.disciplines);
         const disciplines = await DisciplineCrud.selectByIds(ids);

         const created = await crud.insert(req.school, { age, firstName: req.body.firstName, secondName: req.body.secondName, disciplines });
         res.status(201).send(created);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const age = parseInt(req.body.age);

         const ids = await stringToArray(req.body.disciplines);
         const disciplines = await DisciplineCrud.selectByIds(ids);

         const updated = await crud.update(req.params.id, req.school, {
            age,
            disciplines,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
         });
         res.status(200).send(updated);
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const removed = await crud.del(req.params.id, req.school);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   public static async targetMiddleware(req: ITeacherRequest, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectTarget(req.params.id, req.school);
         req.teacher = target;
         await next();
      } catch (err) {
         await next(err);
      }
   }
}
