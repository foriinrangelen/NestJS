import { Strategy } from 'passport-local';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/routers/user/user.module';
import { LocalStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module(
  {
  // 모듈 import 
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    // passport 모듈도 등록
    PassportModule
  ],
  // 모듈에 로컬 전략 providers에 등록해서
  //  NestJS의 의존성 주입 시스템을 활용하기 위해
  providers: [AuthService, LocalStrategy,  JwtStrategy],
  // 외부에서 사용 위해 exports
  exports:[AuthService]
})
export class AuthModule {}
