import { Response, NextFunction } from "express";
import { getManager, Repository } from "typeorm";
import { Unauthorized } from "http-errors";

import { Account } from "models/index";
import { JWTService } from "helpers/index";
import { IAuthRequest } from "types/express/index";

class SessionMiddleware {
  public static async jwt(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const access_token = req.headers["authorization"].toString();
    const accountRepository: Repository<Account> = getManager().getRepository(
      Account
    );
    try {
      const payload = await JWTService.getPayload(access_token);
      const account = await accountRepository.findOne({ id: payload.id });
      if (!account) {
        //should never heppen...
        const unauthorized = new Unauthorized("account doesn't exist");
        await next(unauthorized);
      } else {
        req.account = account;
        await next();
      }
    } catch (err) {
      const unauthorized = new Unauthorized(err.message);
      await next(unauthorized);
    }
  }
}

export { SessionMiddleware };
