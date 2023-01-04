import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;
  @Column()
    user_name!: string;
  @Column()
    nick_name!: string;
  @Column()
    password!: string;
  @Column()
    email!: string;
  @Column()
    phone!: string;
  @Column()
    address!: string;
  @Column()
    role_id!: number;
  @Column()
    avatar!: string;
  @Column()
    last_login_time!: Date;
  @Column()
    token!: string;
}
