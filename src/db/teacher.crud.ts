import { getManager, Repository } from "typeorm";
import { BadRequest } from "http-errors";
import { validate } from "class-validator";

import { School, Teacher, Discipline } from "models/index";
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
   public static async insert(school: School, body: ITeacherBody) {
      const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);
      const teacher = new Teacher();
      teacher.school = school;
      teacher.firstName = body.firstName;
      teacher.secondName = body.secondName;
      teacher.age = body.age;
      teacher.disciplines = body.disciplines;

      const errors = await validate(teacher);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else {
         const saved = await teacherRepository.save(teacher);
         return saved;
      }
   }
   public static async update(id: string, school: School, body: ITeacherBody) {
      const before = await findTeacher(id, school);
      const teacher = new Teacher();

      const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);

      teacher.id = before.id;
      teacher.firstName = body.firstName;
      teacher.secondName = body.secondName;
      teacher.age = body.age;
      teacher.disciplines = body.disciplines;

      const errors = await validate(teacher);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else {
         const after = await teacherRepository.save(teacher);
         return after;
      }
   }
   public static async del(id: string, school: School) {
      const teacher = await findTeacher(id, school);
      const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);
      const removed = await teacherRepository.remove(teacher);
      return removed;
   }
}

const findTeacher = async (id: string, school: School): Promise<Teacher> => {
   const teacherRepository: Repository<Teacher> = getManager().getRepository(Teacher);
   const teacher = await teacherRepository.findOne({ id, school });
   if (!teacher) {
      const badRequest = new BadRequest("teacher not found");
      throw badRequest;
   }
   return teacher;
};
