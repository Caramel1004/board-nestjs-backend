import {v4 as uuidv4} from "uuid";
import { BoardStatus } from "../../boards.model";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String = uuidv4();

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    status: BoardStatus;
}