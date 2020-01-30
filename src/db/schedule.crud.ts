import { getManager, Repository, Equal, Not } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { Teacher, Group, Discipline, Lesson } from "models/index";
import { ILessonBody } from "types/body";
import { ValidationBadRequest } from "types/errors";

export default class ScheduleCRUD {
   //#region  teacher
   public static async selectAllByTeacher(teacher: Teacher) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lessons = await lessonRepository.find({ where: { teacher }, relations: ["discipline", "group"] });
      return lessons;
   }
   public static async selectLessonByTeacher(id: string, teacher: Teacher) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = await lessonRepository.findOne({ where: { id, teacher }, relations: ["discipline", "group"] });
      if (!lesson) {
         const error = new BadRequest("lesson not found");
         throw error;
      }
      return lesson;
   }
   public static async deleteByTeacher(id: string, teacher: Teacher) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = await lessonRepository.findOne({ id, teacher });
      if (!lesson) {
         const err = new BadRequest("lesson not found");
         throw err;
      }
      const removed = await lessonRepository.remove(lesson);
      return removed;
   }
   public static async insertByTeacher(group: Group, teacher: Teacher, body: ILessonBody) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = new Lesson();

      lesson.group = group;
      lesson.teacher = teacher;
      lesson.day = body.day;
      lesson.lessonNumber = body.lessonNumber;
      lesson.discipline = body.discipline;

      const errors = await validate(lesson);
      console.log(body);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await lessonRepository.findOne({ where: { teacher, day: lesson.day, lessonNumber: body.lessonNumber } })) {
         const error = new BadRequest(`lesson at week day ${lesson.day} at lesson № ${lesson.lessonNumber} already exists for teacher `);
         throw error;
      } else {
         const saved = await lessonRepository.save(lesson);
         return saved;
      }
   }
   public static async updateByTeacher(id: string, group: Group, teacher: Teacher, body: ILessonBody) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const before = await lessonRepository.findOne({ id, group, teacher, discipline: body.discipline });
      if (!before) {
         const error = new BadRequest("lesson not found");
         throw error;
      }
      const lesson = new Lesson();
      lesson.id = before.id;
      lesson.day = body.day;
      lesson.lessonNumber = body.lessonNumber;
      lesson.discipline = body.discipline;
      lesson.group = group;
      lesson.teacher = teacher;

      const errors = await validate(lesson);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (
         await lessonRepository.findOne({ where: { id: Not(Equal(lesson.id)), teacher, day: lesson.day, lessonNumber: body.lessonNumber } })
      ) {
         const error = new BadRequest(`lesson at week day ${lesson.day} at lesson № ${lesson.lessonNumber} already exists `);
         throw error;
      } else {
         const after = await lessonRepository.save(lesson);
         return after;
      }
   }

   //#endregion teacher
   // #region group
   public static async selectAllByGroup(group: Group) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lessons = await lessonRepository.find({ where: { group }, relations: ["discipline", "teacher"] });
      return lessons;
   }
   public static async selectlessonByGroup(id: string, group: Group) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = await lessonRepository.findOne({ where: { id, group }, relations: ["discipline", "teacher"] });
      if (!lesson) {
         const error = new BadRequest("lesson not found");
         throw error;
      }
      return lesson;
   }

   public static async insertByGroup(group: Group, teacher: Teacher, body: ILessonBody) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = new Lesson();

      lesson.group = group;
      lesson.teacher = teacher;
      lesson.day = body.day;
      lesson.lessonNumber = body.lessonNumber;
      lesson.discipline = body.discipline;

      const errors = await validate(lesson);
      console.log(body);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await lessonRepository.findOne({ where: { group, day: lesson.day, lessonNumber: body.lessonNumber } })) {
         const error = new BadRequest(`lesson at week day ${lesson.day} at lesson № ${lesson.lessonNumber} already exists for group`);
         throw error;
      } else {
         console.log("here");
         const saved = await lessonRepository.save(lesson);
         return saved;
      }
   }
   public static async updateByGroup(id: string, group: Group, teacher: Teacher, body: ILessonBody) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const before = await lessonRepository.findOne({ id, group, teacher, discipline: body.discipline });
      if (!before) {
         const error = new BadRequest("lesson not found");
         throw error;
      }
      const lesson = new Lesson();
      lesson.id = before.id;
      lesson.day = body.day;
      lesson.lessonNumber = body.lessonNumber;
      lesson.discipline = body.discipline;
      lesson.group = group;
      lesson.teacher = teacher;

      const errors = await validate(lesson);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await lessonRepository.findOne({ where: { id: Not(Equal(lesson.id)), group, day: lesson.day, lessonNumber: body.lessonNumber } })) {
         const error = new BadRequest(`lesson at week day ${lesson.day} at lesson № ${lesson.lessonNumber} already exists `);
         throw error;
      } else {
         const after = await lessonRepository.save(lesson);
         return after;
      }
   }
   public static async deleteByGroup(id: string, group: Group) {
      const lessonRepository: Repository<Lesson> = getManager().getRepository(Lesson);
      const lesson = await lessonRepository.findOne({ id, group });
      if (!lesson) {
         const err = new BadRequest("lesson not found");
         throw err;
      }
      const removed = await lessonRepository.remove(lesson);
      return removed;
   } //#endregion group
}
