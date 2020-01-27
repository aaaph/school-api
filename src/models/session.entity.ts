import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import AccountModel from "./account.entity";

@Entity()
export default class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @OneToOne(
    () => AccountModel,
    account => account.session
  )
  @JoinColumn()
  account: AccountModel;
}
