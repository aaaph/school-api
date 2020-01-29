import { Request } from "express";
import { Account } from "models/index";

export interface IAuthRequest extends Request {
  account: Account;
}
