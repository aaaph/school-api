import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Min, Max } from "class-validator";

import { Student, Discipline } from "models/index";

@Entity()
export default class Progres {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Min(1)
   @Max(12)
   @Column()
   rating: number;

   @ManyToOne(
      () => Student,
      student => student.rating,
   )
   @JoinColumn()
   student: Student;

   @OneToOne(() => Discipline)
   @JoinColumn()
   discipline: Discipline;
}
