import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Min, Max, Length } from "class-validator";

import Teacher from "./teacher.entity";

@Entity()
export default class Discipline {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Length(4, 25)
   @Column()
   title: string;
   //unique by title and cource
   @Min(1)
   @Max(11)
   @Column()
   course: number;

   @ManyToMany(type => Teacher)
   teachers: Teacher;
}
