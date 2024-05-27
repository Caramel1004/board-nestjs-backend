import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BoardEntity } from '../boards/models/entity/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'board-app',
        entities: [BoardEntity],
        synchronize: true
};