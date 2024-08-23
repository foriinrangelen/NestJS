import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt/constants';

@Module({
  // typorm entity 사용위해
  imports: [TypeOrmModule.forFeature([Board, User]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' }  // 60초
    // signOptions: { expiresIn: '10m' }  // 10분
    // signOptions: { expiresIn: '1h' }   // 1시간
    // signOptions: { expiresIn: '1d' }   // 1일
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
