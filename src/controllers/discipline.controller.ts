import { Response, Request, NextFunction } from "express";

import { DisciplineCrud as crud } from "db/index";

export default class DisciplineService {
   public static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const all = await crud.selectAll();
         res.status(200).send(all);
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: Request, res: Response, next: NextFunction) {
      try {
         const target = await crud.selectTarget(req.params.id);
         res.status(200).send(target);
      } catch (err) {
         await next(err);
      }
   }
   public static async create(req: Request, res: Response, next: NextFunction) {
      try {
         const course = parseInt(req.body.course);
         const created = await crud.insert({ course, title: req.body.title });
         res.status(201).send(created);
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: Request, res: Response, next: NextFunction) {
      try {
         const course = parseInt(req.body.course);
         const updated = await crud.update(req.params.id, { course, title: req.body.title });
         res.status(200).send(updated);
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: Request, res: Response, next: NextFunction) {
      try {
         const removed = await crud.del(req.params.id);
         res.sendStatus(204);
      } catch (err) {
         await next(err);
      }
   }
}
