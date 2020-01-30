import { getManager, Repository, Not, Equal } from "typeorm";
import { BadRequest } from "http-errors";
import { validate, ValidationError } from "class-validator";

import { School, Group } from "models/index";
import { IGroupBody } from "types/body";
import { ValidationBadRequest } from "types/errors";

export default class GroupCRUD {
   public static async selectAll(school: School): Promise<Group[]> {
      const groupRepository: Repository<Group> = getManager().getRepository(Group);
      const groups = await groupRepository.find({ school });
      return groups;
   }

   public static async selectTarget(id: string, school: School): Promise<Group> {
      const target = await findGroup(id, school);
      return target;
   }

   public static async insert(school: School, body: IGroupBody): Promise<Group> {
      const groupRepository: Repository<Group> = getManager().getRepository(Group);
      const group = new Group();
      group.course = body.course;
      group.symbol = body.symbol;
      group.school = school;

      const errors: ValidationError[] = await validate(group);
      if (errors.length > 0) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await groupRepository.findOne({ course: group.course, symbol: group.symbol })) {
         const isNotUnique = new BadRequest("group alreay exists");
         throw isNotUnique;
      } else {
         const saved = await groupRepository.save(group);
         return saved;
      }
   }

   public static async update(id: string, school: School, body: IGroupBody): Promise<Group> {
      const before = await findGroup(id, school);
      const groupRepository: Repository<Group> = getManager().getRepository(Group);

      const group = new Group();
      group.id = before.id;
      group.course = body.course;
      group.symbol = body.symbol;
      group.school = before.school;

      const errors: ValidationError[] = await validate(group);
      if (errors.length) {
         const validationBadRequest = new ValidationBadRequest(errors);
         throw validationBadRequest;
      } else if (await groupRepository.findOne({ id: Not(Equal(id)), course: group.course, symbol: group.symbol })) {
         const isNotUnique = new BadRequest("group alreay exists");
         throw isNotUnique;
      } else {
         const after = await groupRepository.save(group);
         return after;
      }
   }

   public static async delete(id: string, school: School) {
      const group = await findGroup(id, school);
      const groupRepository: Repository<Group> = getManager().getRepository(Group);
      const removed = await groupRepository.remove(group);
      return removed;
   }
}
const findGroup = async (id: string, school: School) => {
   const groupRepository: Repository<Group> = getManager().getRepository(Group);
   const group = await groupRepository.findOne({ id, school });
   if (!group) {
      const badRequest = new BadRequest("group not found");
      throw badRequest;
   }
   return group;
};
