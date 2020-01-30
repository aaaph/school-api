import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Length, Min, Max, Equals } from "class-validator";

import { IHuman } from "types/interfaces";

import Group from "./group.entity";
import Progres from "./progres.entity";

@Entity()
export default class Student implements IHuman {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Length(4, 16)
   @Column()
   firstName: string;

   @Length(3, 16)
   @Column()
   secondName: string;

   @Min(6)
   @Max(17)
   //Need validate : if student doesn't match course, return error(example: student with age 6 can not be in 11 course, he match only for 1 course)
   @Column()
   age: number;

   @ManyToOne(
      () => Group,
      group => group.students,
   )
   group: Group;

   @OneToMany(
      () => Progres,
      progres => progres.student,
      { onDelete: "CASCADE" },
   )
   rating: Progres[];

   public validateAge(): boolean {
      return this.age === this.group.course + 5;
   }
}
