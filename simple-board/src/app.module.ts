import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardController } from './board/board.controller';

@Module({
  imports: [],
  // nest g co board 로 Controller로 생성하면 자동으로 model 안에 Controllers 배열안에 추가
  // 만약 module이 만들어져 있었더라면 imports 배열안에 BoardModule이 추가가되고 Controllers배열안에는 추가 X
  controllers: [AppController, BoardController],
  providers: [AppService],
})
export class AppModule {}
