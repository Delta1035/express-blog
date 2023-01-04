import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Category {
  @Column()
  category_name!: string;
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  create_time!: Date;
  @Column()
  poster!: string;
}
