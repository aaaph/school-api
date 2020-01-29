import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import {} from "class-validator";

import { IHuman } from "types/interfaces";

import Discipline from "./discipline.entity";
import Lesson from "./lesson.entity";
import School from "./school.entity";

@Entity()
export default class Teacher implements IHuman {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  age: number;

  @ManyToMany(type => Discipline)
  @JoinTable()
  disciplines: Discipline[];

  @OneToMany(
    () => Lesson,
    less => less.teacher,
    { onDelete: "CASCADE" }
  )
  lessons: Lesson[];

  @ManyToOne(
    () => School,
    school => school.teachers
  )
  @JoinColumn()
  school: School;
}
