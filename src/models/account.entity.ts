import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne
} from "typeorm";
import { HmacSHA1 } from "crypto-js";
import { IsNotEmpty, Min, Max } from "class-validator";

import Session from "./session.entity";

@Entity()
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //must be unique value
  @IsNotEmpty()
  @Min(6)
  @Max(20)
  @Column()
  login: string;

  //need to create hash before insert/update....
  @IsNotEmpty()
  @Min(6)
  @Max(30)
  @Column()
  password: string;

  @OneToOne(
    () => Session,
    session => session.account
  )
  session: Session;
  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword?() {
    const key = process.env.PASSWORD_HASH_KEY;
    this.password = HmacSHA1(this.password, key).toString();
  }
}
