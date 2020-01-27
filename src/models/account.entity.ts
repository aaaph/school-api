import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne
} from "typeorm";
import { HmacSHA1 } from "crypto-js";

import Session from "./session.entity";

@Entity()
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToOne(
    () => Session,
    session => session.account
  )
  session: Session;
  @BeforeInsert()
  @BeforeUpdate()
  private async hashPass?() {
    console.log(`i need create hash to password ${this.password}`);
  }
}
