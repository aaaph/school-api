import { IGroupRequest } from "./IGroupRequest";
import { Student } from "models/index";

export interface IStudentRequest extends IGroupRequest {
   student: Student;
}
