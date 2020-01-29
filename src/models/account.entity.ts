import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne
} from "typeorm";
import { HmacSHA1 } from "crypto-js";
import { IsNotEmpty, Min, Max, Length } from "class-validator";

import Session from "./session.entity";

@Entity()
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //must be unique value
  @IsNotEmpty()
  @Length(6, 20)
  @Column()
  login: string;

  //need to create hash before insert/update....
  @IsNotEmpty()
  @Length(6, 30)
  @Column()
  password: string;

  @OneToOne(
    () => Session,
    session => session.account
  )
  session: Session;
  @BeforeInsert()
  private async hashPassword?() {
    const key = process.env.PASSWORD_HASH_KEY;
    this.password = HmacSHA1(this.password, key).toString();
  }

  public validatePassword(toEqual: string): boolean {
    const key = process.env.PASSWORD_HASH_KEY;
    const hash = HmacSHA1(toEqual, key).toString();
    return this.password === hash;
  }
}
