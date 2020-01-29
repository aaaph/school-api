import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Min, Max, Length } from "class-validator";

import Group from "./group.entity";
import Teacher from "./teacher.entity";

@Entity()
export default class School {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   //unique
   @Length(6, 50)
   @Column({ unique: true })
   name: string;

   @Min(1)
   @Max(7)
   @Column()
   days: number;

   @OneToMany(
      () => Group,
      grp => grp.school,
   )
   groups: Group[];

   @OneToMany(
      () => Teacher,
      tch => tch.school,
   )
   teachers: Teacher[];
}
