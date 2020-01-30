import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Length, Min } from "class-validator";

import { IHuman } from "types/interfaces";

import Discipline from "./discipline.entity";
import Lesson from "./lesson.entity";
import School from "./school.entity";

@Entity()
export default class Teacher implements IHuman {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Length(4, 16)
   @Column()
   firstName: string;
   @Length(3, 16)
   @Column()
   secondName: string;

   @Min(21)
   @Column()
   age: number;

   @ManyToMany(type => Discipline, { onDelete: "CASCADE" })
   @JoinTable()
   disciplines: Discipline[];

   @OneToMany(
      () => Lesson,
      less => less.teacher,
      { onDelete: "CASCADE" },
   )
   lessons: Lesson[];

   @ManyToOne(
      () => School,
      school => school.teachers,
   )
   @JoinColumn()
   school: School;
}
