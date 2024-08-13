import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './board/middlewares/logging.middleware';

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


// 만든 middleware를 전역적으로 사용하기 위해 AppModule에 등록해줘야하며
// 등록하기 위해서는 NestModule을 구현 해야한다
export class AppModule implements NestModule{
  // 이 configure() method를 필수적으로 구현해줘야 한다
  configure(consumer: MiddlewareConsumer) {
    // .forRoutes('*'); : 어디에 적용할지 *은 전체 라우터, 특정경로라면 특정경로에만 등록
    // ex ) consumer.apply(LoggingMiddleware).forRoutes('board');
    // 여러개의 middleware를 등록하고싶다면 apply()에 추가
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(LoggingMiddleware).forRoutes('board'); // 와 같이 consumer.apply()를 여러번 사용하여 여러 상황에 middleware를 등록할 수 있음
    
  }
}
