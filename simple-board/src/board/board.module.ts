import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

// board module에서는 BoardController와 BoardService만 설정하게 되서 다른모듈에서 사용할 수 있는 형태로 구현된다(기능 캡슐화)
@Module({
    // 데이터베이스의 엔티티를 연동하기 위해 TypeOrmModule의 forFeature메서드를 통해 배열형태로 넣어줘서 엔터티 가져오기
    imports: [TypeOrmModule.forFeature([Board, User])],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {}
