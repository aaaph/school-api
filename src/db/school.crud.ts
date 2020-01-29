import { getManager, Repository, Not, Equal } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { School } from "models/index";
import { ISchoolBody } from "types/body";
import { ValidationBadRequest } from "types/errors";

export default class SchoolCRUD {
   public static async selectAll(): Promise<School[]> {
      const schoolRepository: Repository<School> = getManager().getRepository(School);

      const schools = await schoolRepository.find();

      return schools;
   }

   public static async selectTargetById(id: string): Promise<School> {
      const school = await selectById(id);
      return school;
   }

   public static async insert(body: ISchoolBody): Promise<School> {
      const schoolRepository: Repository<School> = getManager().getRepository(School);

      const school = new School();
      school.name = body.name;
      school.days = body.days;

      const errors: ValidationError[] = await validate(school);
      if (errors.length > 0) {
         //return validation errror
         const validationErrors = new ValidationBadRequest(errors);
         throw validationErrors;
      } else if (await schoolRepository.findOne({ name: school.name })) {
         const notUniqueName = new BadRequest("school name must be unique value");
         throw notUniqueName;
      } else {
         const saved = await schoolRepository.save(school);
         return saved;
      }
   }
   public static async update(id: string, body: ISchoolBody): Promise<School> {
      const before: School = await selectById(id);
      const schoolRepository: Repository<School> = getManager().getRepository(School);

      const school = new School();
      school.id = before.id;
      school.name = body.name;
      school.days = body.days;

      const errors: ValidationError[] = await validate(school);
      if (errors.length > 0) {
         const validationErrors = new ValidationBadRequest(errors);
         throw validationErrors;
      } else if (await schoolRepository.findOne({ id: Not(Equal(id)), name: school.name })) {
         const notUniqueName = new BadRequest("school name must be unique value");
         throw notUniqueName;
      } else {
         const after = await schoolRepository.save(school);
         return after;
      }
   }
   public static async del(id: string): Promise<School> {
      const school: School = await selectById(id);
      const schoolRepository: Repository<School> = getManager().getRepository(School);
      const removed = await schoolRepository.remove(school);
      return removed;
   }
}

const selectById = async (id: string): Promise<School> => {
   const schoolRepository: Repository<School> = getManager().getRepository(School);
   const school = await schoolRepository.findOne({ id });
   if (!school) {
      const badRequest = new BadRequest("school not found");
      throw badRequest;
   } else {
      return school;
   }
};
