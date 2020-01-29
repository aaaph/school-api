import { Request, Response, NextFunction } from "express";

class SchoolServie {
  public static async getAll(req: Request, res: Response, next: NextFunction) {}
  public static async getTarget(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

  public static async create(req: Request, res: Response, next: NextFunction) {}
  public static async update(req: Request, res: Response, next: NextFunction) {}
  public static async del(req: Request, res: Response, next: NextFunction) {}
}
