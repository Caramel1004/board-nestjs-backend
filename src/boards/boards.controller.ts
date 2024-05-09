import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board } from "./boards.model";
import { BoardDto } from "./dto/board.dto";

@Controller('/boards')
export class BoardsController {

    constructor(private boardsService: BoardsService) { }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getById(@Param('id') id: String): Board {
        return this.boardsService.getPostById(id);
    }

    @Post('/create')
    createPost(@Body() boardDto: BoardDto): Board {
        return this.boardsService.createPost(boardDto)
    }

    @Delete('/delete/:id')
    deletePostById(@Param('id') id: String) {
        return this.boardsService.deletePostById(id);
    }

    @Put('/update/:id')
    updatePostById(@Param('id') id: String, @Body() boardDto: BoardDto) {
        return this.boardsService.updatePostById(id, boardDto);
    }
}