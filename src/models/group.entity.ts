import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import {} from "class-validator";

import Student from "./student.entity";
import Lesson from "./lesson.entity";
import School from "./school.entity";

@Entity()
export default class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  course: number;
  //unique by course and symbol
  @Column("char")
  symbol: symbol;

  @OneToMany(
    () => Student,
    student => student.group
  )
  students: Student[];

  @OneToMany(
    () => Lesson,
    less => less.group,
    { onDelete: "CASCADE" }
  )
  lessons: Lesson[];

  @ManyToOne(
    () => School,
    school => school.groups
  )
  school: School;
}
