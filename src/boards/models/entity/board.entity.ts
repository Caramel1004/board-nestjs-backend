import { BoardStatus } from "src/boards/boards.model";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    private postId: String;

    @Column()
    private title: String;

    @Column()
    private description: String;

    @Column()
    private status: BoardStatus;
}