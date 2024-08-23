import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './routers/board/board.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import  ConfigModule  from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routers/user/user.module';
import { jwtConstants } from './jwt/constants';
import { JwtModule } from '@nestjs/jwt';
@Module({
  // nest g mo board 로 생성하면 자동으로 모듈이 메인 모듈에 import 된다
  // 환경설정 위한 ConfigModule.forRoot() import
  imports: [
    // 다이나믹 모듈이기때문에 호출까지,
    ConfigModule(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities:[__dirname + '/**/*.entity.{ts,js}'], // 모델을 가지고 있는 엔터티들의 위치
      synchronize: false, // 엔터티가 테이블의 정의를 가지고있는데 엔터티가 변할때 이 변환값을 실제 DB에 반영할건지,(false 추천)
      logging: true, // 데이터베이스 query를 확인가능
    }),
   
    BoardModule,
    UserModule
  ],
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
