import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes } from "@nestjs/common";
import { BoardsService } from "../services/boards.service";
import { BoardDto } from "../models/dto/board.dto";
import { BoardEntity } from "../models/entity/board.entity";
import { BoardStatusValidationPipe } from "../pipes/board-status-validation.pipe";

@Controller('/boards')
export class BoardsController {

    constructor(private boardsService: BoardsService) { }

    /* 모든 게시물 조회 */
    @Get('/')
    async getAllBoard(): Promise<BoardEntity[]> {
        return await this.boardsService.getAllBoards();
    }

    /* 특정 게시물 조회 */
    @Get('/:id')
    getPostById(@Param('id') id: string): Promise<BoardEntity> {
        return this.boardsService.getPostById(id);
    }

    /* 게시물 생성 */
    @Post('/create')
    // @UsePipes(BoardStatusValidationPipe)
    createPost(@Body() boardDto: BoardDto): Promise<BoardEntity> {
        return this.boardsService.createPost(boardDto)
    }

    /* 특정 게시물 삭제*/
    @Delete('/delete/:id')
    deletePostById(@Param('id') id: String) {
        return this.boardsService.deletePostById(id);
    }

    /* 특정 게시물 업데이트 */
    @Put('/update/:id')
    updatePostById(@Param('id') id: String, @Body() boardDto: BoardDto) {
        return this.boardsService.updatePostById(id, boardDto);
    }
}