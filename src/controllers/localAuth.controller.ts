import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { getManager, Repository } from "typeorm";
import { BadRequest, Unauthorized } from "http-errors";

import { Account } from "models/index";
import { ValidationBadRequest } from "types/index";
import { JWTService } from "helpers/index";

class AuthService {
  public static async sing_in(req: Request, res: Response, next: NextFunction) {
    const login = req.body["login"];
    const password = req.body["password"];

    const accountRepository: Repository<Account> = getManager().getRepository(
      Account
    );
    const account = await accountRepository.findOne({ login });
    if (!account) {
      const err = new BadRequest("account doesn't exists");
      await next(err);
    } else {
      if (!account.validatePassword(password)) {
        const err = new Unauthorized("invalid password");
        await next(err);
      } else {
        const pair = await JWTService.createPair(account);
        res.status(200).send(pair);
      }
    }
  }
  public static async sign_up(req: Request, res: Response, next: NextFunction) {
    //need create account with input body....
    //return 201;
    const accountRepository: Repository<Account> = getManager().getRepository(
      Account
    );

    const account = new Account();
    account.login = req.body["login"];
    account.password = req.body["password"];

    const errors: ValidationError[] = await validate(account);
    if (errors.length > 0) {
      console.log(account);
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
  public static async refresh(req: Request, res: Response, next: NextFunction) {
    const refresh = req.body["refresh"];
    res.status(401).send("need create new jwt pair");
  }
}
export { AuthService };
