import { getManager, Repository, Equal, Not, In } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { IDisciplineBody, ValidationBadRequest } from "types/index";
import { Discipline } from "models/index";

export default class DisciplineCRUD {
   public static async selectAll(): Promise<Discipline[]> {
      const DiscRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      const disciplines = await DiscRepository.find();
      return disciplines;
   }
   public static async selectTarget(id: string): Promise<Discipline> {
      const discipline = await getDisciplineById(id);
      return discipline;
   }
   public static async selectByIds(arr: string[]): Promise<Discipline[]> {
      const discRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      const disciplines = await discRepository.find({ where: { id: In(arr) } });

      return disciplines;
   }
   public static async selectByTitleAndCourse(title: string, course: number): Promise<Discipline> {
      const disciplineRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      console.log(title, course);
      const discipline = await disciplineRepository.findOne({ title, course });
      if (!discipline) {
         const badRequest = new BadRequest("discipline not found");
         throw badRequest;
      }
      return discipline;
   }
   public static async insert(body: IDisciplineBody): Promise<Discipline> {
      const discRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      const discipline = new Discipline();
      discipline.course = body.course;
      discipline.title = body.title;

      const errors: ValidationError[] = await validate(discipline);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await discRepository.findOne({ title: discipline.title, course: discipline.course })) {
         const isNotUniqueError = new BadRequest("discipline with input values already exists");
         throw isNotUniqueError;
      } else {
         const saved = await discRepository.save(discipline);
         return saved;
      }
   }
   public static async update(id: string, body: IDisciplineBody) {
      const before = await getDisciplineById(id);
      const disciplineRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      const discipline = new Discipline();
      discipline.id = before.id;
      discipline.course = body.course;
      discipline.title = body.title;

      const errors: ValidationError[] = await validate(discipline);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await disciplineRepository.findOne({ id: Not(Equal(id)), title: discipline.title, course: discipline.course })) {
         const isNotUniqueError = new BadRequest("discipline with input values already exists");
         throw isNotUniqueError;
      } else {
         const after = await disciplineRepository.save(discipline);
         return after;
      }
   }
   public static async del(id: string) {
      const discipline = await getDisciplineById(id);
      const disciplineRepository: Repository<Discipline> = getManager().getRepository(Discipline);
      const removed = await disciplineRepository.remove(discipline);
      return removed;
   }
}

const getDisciplineById = async (id: string) => {
   const DiscRepository: Repository<Discipline> = getManager().getRepository(Discipline);
   const discipline = await DiscRepository.findOne({ id });
   if (!discipline) {
      const badRequest = new BadRequest("discipline not found");
      throw badRequest;
   }
   return discipline;
};
