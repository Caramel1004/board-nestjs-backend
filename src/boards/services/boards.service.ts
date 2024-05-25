import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from "../boards.model";
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../models/entity/board.entity';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    constructor(
        @InjectRepository(BoardEntity) 
        private boardsRepository: Repository<BoardEntity>
    ) {}

    async getAllBoards(): Promise<BoardEntity[]> {
        return await this.boardsRepository.find();
    }

    getPostById(id: String): Board {
        return this.boards.find(post => post.id === id);
    }

    createPost({ title, description }): Board {
        const board: Board = {
            id: randomUUID(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);

        return board;
    }

    deletePostById(id: String) {
        this.boards = [...this.boards.filter(post => post.id !== id)];

        return {
            code: 200,
            msg: `${id} 게시물이 삭제 되었습니다.`
        }
    }

    updatePostById(id, { title, description }) {
        let post: Board = {
            id,
            title,
            description,
            status: this.boards.filter(post => post.id === id)[0].status
        }

        this.boards = this.boards.map(board => {
            if (board.id === id) {
                board = {
                    ...post
                }
            }
            return board;
        });

        return {
            code: 200,
            msg: `${id} 게시물이 수정 되었습니다.`
        }
    }
}
