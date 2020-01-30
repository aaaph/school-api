import { ISchoolRequst } from "./ISchoolRequest";
import { Group } from "models/index";

export interface IGroupRequest extends ISchoolRequst {
   group: Group;
}
