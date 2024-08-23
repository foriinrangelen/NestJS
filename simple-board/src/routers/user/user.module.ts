import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt/constants';

@Module({
  // typeorm entity 사용위해
  imports: [TypeOrmModule.forFeature([Board, User]),
  // jwt 모듈에 등록
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' }  // 60초
    // signOptions: { expiresIn: '10m' }  // 10분
    // signOptions: { expiresIn: '1h' }   // 1시간
    // signOptions: { expiresIn: '1d' }   // 1일
  })
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]  // UserService를 authModule에서도 import할 수 있도록 exports
  
})
export class UserModule {}
