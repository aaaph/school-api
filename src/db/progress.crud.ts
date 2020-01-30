import { getManager, Repository, Not, Equal } from "typeorm";
import { BadRequest } from "http-errors";
import { validate } from "class-validator";

import { Student, Progress } from "models/index";
import { IProgressBody } from "types/body";
import { ValidationBadRequest } from "types/errors";

export default class ProgressService {
   public static async getAllByStudent(student: Student) {
      const progresReposityory: Repository<Progress> = getManager().getRepository(Progress);
      const progress = await progresReposityory.find({ where: { student }, relations: ["discipline"] });

      return progress;
   }
   public static async getTargetByStudent(id: string, student: Student) {
      const progressRepository: Repository<Progress> = getManager().getRepository(Progress);
      const progress = await progressRepository.findOne({ where: { id, student }, relations: ["discipline"] });

      if (!progress) {
         const err = new BadRequest("progres not fount");
         throw err;
      }
      return progress;
   }
   public static async createForStudent(student: Student, body: IProgressBody) {
      const progressRepository: Repository<Progress> = getManager().getRepository(Progress);
      const progress = new Progress();
      progress.student = student;
      progress.discipline = body.discipline;
      progress.rating = body.rating;

      const errors = await validate(progress);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await progressRepository.findOne({ student, discipline: progress.discipline })) {
         const existError = new BadRequest("rating for student already exist");
         throw existError;
      } else {
         const saved = await progressRepository.save(progress);
         return saved;
      }
   }
   public static async updateForStudent(id: string, student: Student, body: IProgressBody) {
      const progressRepository: Repository<Progress> = getManager().getRepository(Progress);
      const before = await progressRepository.findOne({ id, student });
      if (!before) {
         const err = new BadRequest("progress not found");
         throw err;
      }
      const progress = new Progress();
      progress.id = before.id;
      progress.student = student;
      progress.discipline = body.discipline;
      progress.rating = body.rating;

      const errors = await validate(progress);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await progressRepository.findOne({ id: Not(Equal(progress.id)), student, discipline: progress.discipline })) {
         const existError = new BadRequest("rating for student already exist");
         throw existError;
      } else {
         const after = await progressRepository.save(progress);
         return after;
      }
   }
   public static async deleForStudent(id: string, student: Student) {
      const progressRepository: Repository<Progress> = getManager().getRepository(Progress);
      const progress = await progressRepository.findOne({ id, student });

      if (!progress) {
         const err = new BadRequest("progres not fount");
         throw err;
      }
      const removed = await progressRepository.remove(progress);
      return removed;
   }
}
