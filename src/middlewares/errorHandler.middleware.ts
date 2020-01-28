import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
const errorHandler = (
  err: HttpError,
  req: Request,
  response: Response,
  next: NextFunction
) => {
  response.setHeader("Content-Type", "application/json");
  console.log(err.stack);
  const status = err.status || err.statusCode || 500;
  const message = err.message;
  response.status(status).send(message);
};
const errorMiddleware = () => errorHandler;

export { errorMiddleware };
