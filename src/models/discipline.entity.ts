import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import {} from "class-validator";

import Teacher from "./teacher.entity";

@Entity()
export default class Discipline {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;
  //unique by title and cource
  @Column()
  course: number;

  @ManyToMany(type => Teacher)
  teachers: Teacher;
}
