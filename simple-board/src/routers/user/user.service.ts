import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
    // 유저 데이터 조회위해
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    // 전체 유저 가져오는 method
    async getUser2() {
        // console.log("getuser")
        return this.userRepository.find()
    }
    
    async getUser1() {
        return this.userRepository.find({
            // relations 를 넣어주면 유저가 작성한 게시글을 관계로 전부 가져온다
            relations: {
                boards: true,
            },
            // select로 특정 columns만 가져오기
            select:{
                id:true,
            }
        })
    }

    // 쿼리빌더(Query Builder) 사용해보기
    async getUser() {
        const qb= this.userRepository.createQueryBuilder();

        // addSelect(): qb에 Select문법 추가
        qb.addSelect((subQuery)=> {
            return subQuery.select('count(id)').from(Board, 'Board').where('Board.userId = User.id')
            // addSelect 의 두번째 매개변수로 가져올 가상컬럼(virtual column) 이름 지정하기
            // 이 이름으로 가져오게된다 userRepository로 가져오기때문에 내부적으로는 User_boardCount가 된다
            // typeorm이 user entity와 mapping 하기 위해서 자체적으로 alias를 변경하기때문에 
            // virtual 컬럼을 사용하기 위해서는 동일한 형태로 네이밍 해줘야한다
        }, 'User_boardCount')

        return qb.getMany();
    }

    // 회원가입 메서드
    async createUser(data: createUserDto) {
        console.log(data)
        return this.userRepository.save(data);
    }
}
