import { getManager, Repository } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { Group, Student } from "models/index";
import { IStudentBody } from "types/body";
import { ValidationBadRequest } from "types/errors";

export default class StudentCRUD {
   public static async selectAll(group: Group): Promise<Student[]> {
      const studentRepository: Repository<Student> = getManager().getRepository(Student);
      const students = await studentRepository.find({ group });
      return students;
   }
   public static async selectTarget(id: string, group: Group): Promise<Student> {
      const student = await findStudent(id, group);
      return student;
   }
   public static async insert(group: Group, body: IStudentBody): Promise<Student> {
      const studentRepository: Repository<Student> = getManager().getRepository(Student);
      const student = new Student();
      student.firstName = body.firstName;
      student.secondName = body.secondName;
      student.age = body.age;
      student.group = group;

      const errors: ValidationError[] = await validate(student);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (!student.validateAge()) {
         const notMatchAgeError = new BadRequest(`student doesn't match by age in group. Here only students are ${group.course + 5} age`);
         throw notMatchAgeError;
      } else {
         const saved = await studentRepository.save(student);
         return saved;
      }
   }
   public static async update(id: string, group: Group, body: IStudentBody): Promise<Student> {
      const before = await findStudent(id, group);
      const studentRepository: Repository<Student> = getManager().getRepository(Student);
      const student = new Student();
      student.id = before.id;
      student.firstName = body.firstName;
      student.secondName = body.secondName;
      student.age = body.age;

      const errors = await validate(student);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (!student.validateAge()) {
         const notMatchAgeError = new BadRequest(`student doesn't match by age in group. Here only students are ${group.course + 5} age`);
         throw notMatchAgeError;
      } else {
         const after = studentRepository.save(student);
         return after;
      }
   }
   public static async del(id: string, group: Group): Promise<Student> {
      const student = await findStudent(id, group);
      const studentRepository: Repository<Student> = getManager().getRepository(Student);
      const removed = await studentRepository.remove(student);
      return removed;
   }
}

const findStudent = async (id: string, group: Group) => {
   const studentRepository: Repository<Student> = getManager().getRepository(Student);
   const student = await studentRepository.findOne({ id, group });
   if (!student) {
      const badRequest = new BadRequest("student not found");
      throw badRequest;
   }
   return student;
};
