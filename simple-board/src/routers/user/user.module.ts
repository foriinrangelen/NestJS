import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';

@Module({
  // typorm entity 사용위해
  imports: [TypeOrmModule.forFeature([Board, User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
