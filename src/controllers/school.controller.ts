import { Request, Response, NextFunction } from "express";
import { ISchoolRequst } from "types/express";

import { SchoolCrud } from "db/index";

export default class SchoolService {
   public static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const all = await SchoolCrud.selectAll();
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: Request, res: Response, next: NextFunction) {
      try {
         const target = await SchoolCrud.selectTargetById(req.params.id);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }

   public static async create(req: Request, res: Response, next: NextFunction) {
      try {
         const days = parseInt(req.body.days);
         console.log(days);
         const created = await SchoolCrud.insert({ days, name: req.body.name });
         res.status(201).send(created);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: Request, res: Response, next: NextFunction) {
      try {
         const days = parseInt(req.body.days);
         const updated = await SchoolCrud.update(req.params.id, { days, name: req.body.name });
         res.status(200).send(updated);
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: Request, res: Response, next: NextFunction) {
      try {
         const deleted = await SchoolCrud.del(req.params.id);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   public static async targetMiddleware(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const target = await SchoolCrud.selectTargetById(req.params.id);
         req.school = target;
         await next();
      } catch (err) {
         await next(err);
      }
   }
}
