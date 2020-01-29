import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {} from "class-validator";

import { IHuman } from "types/interfaces";

import Group from "./group.entity";

@Entity()
export default class Student implements IHuman {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  age: number;

  @ManyToOne(
    () => Group,
    group => group.students
  )
  group: Group;
}
