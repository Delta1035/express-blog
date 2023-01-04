import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.model";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  article_name!: string;
  @Column()
  article_text!: string;
  @Column()
  create_time!: Date;
  @UpdateDateColumn()
  update_time!: Date;
  @Column()
  author_id!: number;
  @Column()
  read_num!: number;
  @Column()
  like_num!: number;
  @Column()
  summary!: string;
  @Column()
  poster!: string;
  @Column()
  private!: 0 | 1;
  @Column()
  deleted!: 0 | 1;
  @ManyToOne(()=>User)
  @JoinColumn({name:"author_id"})
  user!:User;
}
