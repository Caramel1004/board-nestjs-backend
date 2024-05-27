import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from "../boards.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../models/entity/board.entity';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardEntity)
        private boardsRepository: Repository<BoardEntity>
    ) { }

    /* 모든 게시물 조회 */
    async getAllBoards(): Promise<BoardEntity[]> {
        return await this.boardsRepository.find();
    }

    /* 특정 게시물 조회 */
    async getPostById(id: String): Promise<BoardEntity> {
        console.log(id);
        const post = await this.boardsRepository
            .createQueryBuilder('board')
            .where('board.id = :id', { id: id })
            .getOne();

        if (!post) {
            throw new NotFoundException(`게시물이 없습니다.`);
        }

        return post;
    }

    /* 게시물 생성 */
    async createPost({ title, description }): Promise<BoardEntity> {
        const board: BoardEntity = this.boardsRepository.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC
        });

        return await this.boardsRepository.save(board);
    }

    /* 특정 게시물 삭제*/
    async deletePostById(id: String) {

        await this.boardsRepository.createQueryBuilder()
            .delete()
            .from(BoardEntity)
            .where("id = :id", { id: id })
            .execute();

        return {
            code: 200,
            msg: `${id} 게시물이 삭제 되었습니다.`
        }
    }

    /* 특정 게시물 업데이트 */
    async updatePostById(id: String, { title, description }) {

        await this.boardsRepository.createQueryBuilder()
            .update(BoardEntity)
            .set({
                title: title,
                description: description,
                status: BoardStatus.PUBLIC
            })
            .where('id=:id', { id: id })
            .execute()

        return {
            code: 200,
            msg: `${id} 게시물이 수정 되었습니다.`
        }
    }
}
