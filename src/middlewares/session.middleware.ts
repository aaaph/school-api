import { Request, Response, NextFunction } from "express";

class SessionMiddleware {
  public static async jwt(req: Request, res: Response, next: NextFunction) {}
}

export { SessionMiddleware };
