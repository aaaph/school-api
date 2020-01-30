import { ISchoolRequst } from "./ISchoolRequest";
import { Teacher } from "models/index";

export interface ITeacherRequest extends ISchoolRequst {
   teacher: Teacher;
}
