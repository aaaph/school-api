import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import {} from "class-validator";

import Group from "./group.entity";
import Teacher from "./teacher.entity";

@Entity()
export default class Lesson {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  day: number;

  @Column()
  lessonNumber: number;

  //group
  @ManyToOne(
    () => Group,
    grp => grp.lessons
  )
  group: Group;

  //teacher
  @ManyToOne(
    () => Teacher,
    thc => thc.lessons
  )
  teacher: Teacher;

  //discipline
}
