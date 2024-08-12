import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';

@Module({
  // nest g mo board 로 생성하면 자동으로 모듈이 메인 모듈에 import 된다
  imports: [BoardModule],
  // nest g co board 로 Controller로 생성하면 자동으로 model 안에 Controllers 배열안에 추가
  // 만약 module이 만들어져 있었더라면 imports 배열안에 BoardModule이 추가가되고 Controllers배열안에는 추가 X
  // 그래서 항상 controller를 먼저 생성할 것인지 module을 먼저 생성할 것인지 생각하기
  // 기본적으로 module을 먼저 생성해야 깔끔
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
