import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import { BadRequest } from "http-errors";

import { Account } from "models/index";
import { ValidationBadRequest } from "types/errors/index";

class AuthService {
  public static async sing_in(req: Request, res: Request) {}
  public static async sign_up(req: Request, res: Response, next: NextFunction) {
    //need create account with input body....
    //return 201;
    const accountRepository: Repository<Account> = getManager().getRepository(
      Account
    );

    const account = new Account();
    account.login = req.body.login;
    account.password = req.body.password;

    const errors: ValidationError[] = await validate(account);
    if (errors.length > 0) {
      const err = new ValidationBadRequest(errors);
      await next(err);
    } else if (await accountRepository.findOne({ login: account.login })) {
      const err = new BadRequest("login already exists");
      await next(err);
    } else {
      const saved = await accountRepository.save(account);
      res.sendStatus(201);
      //return only 201
      res.end();
    }
  }
}
export { AuthService };
