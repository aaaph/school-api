import { Discipline } from "models/index";
import { IHuman } from "../interfaces";
export interface ITeacherBody extends IHuman {
   disciplines: Discipline[];
}
