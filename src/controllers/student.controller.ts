import { Response, NextFunction } from "express";
import { IGroupRequest, IStudentRequest } from "types/express";

import crud from "db/student.crud";

export default class StudentService {
   public static async getAll(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const students = await crud.selectAll(req.group);
         res.status(200).send(students);
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const student = await crud.selectTarget(req.params.id, req.group);
         res.status(200).send(student);
      } catch (err) {
         await next(err);
      }
   }
   public static async create(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const age = parseInt(req.body.age);
         const created = await crud.insert(req.group, { firstName: req.body.firstName, secondName: req.body.secondName, age });
         res.status(201).send(created);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const age = parseInt(req.body.age);
         const updated = await crud.update(req.params.id, req.group, { firstName: req.body.firstName, secondName: req.body.secondName, age });
         res.status(200).send(updated);
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const removed = await crud.del(req.params.id, req.group);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   public static async targetMiddleware(req: IStudentRequest, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectTarget(req.params.id, req.group);
         req.student = target;
         await next();
      } catch (err) {
         await next(err);
      }
   }
}
