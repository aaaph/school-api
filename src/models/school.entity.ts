import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {} from "class-validator";

import Group from "./group.entity";
import Teacher from "./teacher.entity";

@Entity()
export default class School {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //unique
  @Column()
  name: string;

  @Column()
  days: number;

  @OneToMany(
    () => Group,
    grp => grp.school
  )
  groups: Group[];

  @OneToMany(
    () => Teacher,
    tch => tch.school
  )
  teachers: Teacher[];
}
