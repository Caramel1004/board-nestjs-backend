import { Module } from '@nestjs/common';
import { BoardsController } from './controllers/boards.controller';
import { BoardsService } from './services/boards.service';
import { BoardEntity } from './models/entity/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([BoardEntity]),
        TypeOrmModule.forFeature([Repository<BoardEntity>])
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule { }
