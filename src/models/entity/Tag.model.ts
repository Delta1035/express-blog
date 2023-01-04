import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Tag  {
    @PrimaryGeneratedColumn()
    id!:number
    @Column()
    tag_name!:string
    @Column()
    create_time!:Date
}