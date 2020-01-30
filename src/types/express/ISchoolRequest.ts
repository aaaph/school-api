import { IAuthRequest } from "./IRequest";
import { School } from "models/index";

export interface ISchoolRequst extends IAuthRequest {
   school: School;
}
