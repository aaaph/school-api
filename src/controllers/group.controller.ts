import { Response, NextFunction } from "express";
import { ISchoolRequst, IGroupRequest } from "types/express";

import crud from "db/group.crud";

export default class GroupService {
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
         const course = parseInt(req.body.course);

         const created = await crud.insert(req.school, {
            course,
            symbol: req.body.symbol,
         });
         res.status(201).send(created);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const course = parseInt(req.body.course);
         const updated = await crud.update(req.params.id, req.school, {
            course,
            symbol: req.body.symbol,
         });
         res.status(200).send(updated);
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
         const removed = await crud.delete(req.params.id, req.school);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
   public static async targetMiddleware(req: IGroupRequest, res: Response, next: NextFunction) {
      try {
         const group = await crud.selectTarget(req.params.id, req.school);
         req.group = group;
         await next();
      } catch (err) {
         await next(err);
      }
   }
}
