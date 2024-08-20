import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    // 유저 데이터 조회위해
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async getuser() {
        console.log("getuser")
        return this.userRepository.find()
    }

}
