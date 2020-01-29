import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";

const uuidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
   const uuid = req.params.id;
   const isUUID = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/.test(uuid);
   if (!isUUID) {
      const badRequest = new BadRequest("uuid exception");
      await next(badRequest);
   }
   await next();
};
export { uuidMiddleware };
