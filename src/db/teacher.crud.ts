import { getManager, Repository } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { School, Teacher } from "models/index";
import { ValidationBadRequest } from "types/errors";
import { ITeacherBody } from "types/body";

export default class TeacherCRUD {
   public static async selectAll(school: School) {
      const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);
      const teachers = await teacherRepository.find({ school });
      return teachers;
   }
   public static async selectTarget(id: string, school: School) {
      const teacher = await findTeacher(id, school);
      return teacher;
   }
   public static async insert(school: School, body: ITeacherBody) {}
   public static async update(id: string, school: School, body: ITeacherBody) {}
   public static async del(id: string, school: School) {}
}

const findTeacher = async (id: string, school: School) => {
   const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);
   const teacher = await teacherRepository.findOne({ id, school });
   if (!teacher) {
      const badRequest = new BadRequest("teacher not found");
      throw badRequest;
   }
   return teacher;
};
