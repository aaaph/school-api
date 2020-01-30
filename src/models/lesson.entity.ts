import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Min, Max } from "class-validator";

import Group from "./group.entity";
import Teacher from "./teacher.entity";
import { Discipline } from ".";

@Entity()
export default class Lesson {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Min(1)
   @Max(7)
   @Column()
   day: number;

   @Min(1)
   @Max(9)
   @Column()
   lessonNumber: number;

   //group
   @ManyToOne(
      () => Group,
      grp => grp.lessons,
   )
   group: Group;

   //teacher
   @ManyToOne(
      () => Teacher,
      thc => thc.lessons,
   )
   teacher: Teacher;

   //discipline. i might be refference to Discipline, but Discipline need to know about all lessons??
   @ManyToOne(
      type => Discipline,
      disc => disc.id,
   )
   @JoinColumn()
   discipline: Discipline;
}
