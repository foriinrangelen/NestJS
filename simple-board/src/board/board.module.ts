import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

// board module에서는 BoardController와 BoardService만 설정하게 되서 다른모듈에서 사용할 수 있는 형태로 구현된다(기능 캡슐화)
@Module({
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {}
