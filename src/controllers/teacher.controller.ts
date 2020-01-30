import { Response, NextFunction } from "express";
import { ISchoolRequst } from "types/express";

export default class TeacherService {
   public static async getAll(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
      } catch (err) {
         await next(err);
      }
   }
   public static async getTarget(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
      } catch (err) {
         await next(err);
      }
   }
   public static async create(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
      } catch (err) {
         await next(err);
      }
   }
   public static async update(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
      } catch (err) {
         await next(err);
      }
   }
   public static async del(req: ISchoolRequst, res: Response, next: NextFunction) {
      try {
      } catch (err) {
         await next(err);
      }
   }
}
