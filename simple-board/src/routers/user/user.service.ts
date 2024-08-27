import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
// import { Jwt } from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
    // 유저 데이터 조회위해
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
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
                userNo:true,
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
    async createUser(data: CreateUserDto) {
        console.log(data)
        const {userId, password, name}= data;

        // bcrypt module 사용해서 hash화 하기
        // hash() 함수는 promise를 반환하고 첫번째 매개변수로 입력받은 password, 두번째 매개변수로 salt를받는다
        const encryptedPassword= await this.encryptPassword(password)

        // hash화한 비밀번호로 변경해서 userRepository로 DB에 저장하기
        return this.userRepository.save({
            userId,
            name,
            password: encryptedPassword,
        });
    }

    // 비밀번호 hash화 하는 method
    async encryptPassword(password: string){
        const DEFAULT_SALT= 11;
        return hash(password, DEFAULT_SALT);
    }
    
    // 유저 정보찾는 method
    async getUserByUserId(userId: string){
        console.log("들어옴123")
        return this.userRepository.findOneBy({userId});
    }

    // 로그인 메서드
    async login(data: LoginUserDto){
        const {userId, password}= data;

  
            // 아이디 있는지 확인
            const user= await this.getUserByUserId(userId)
            // 아이디가 없다면 404
            if(!user) throw new HttpException('NOT_FOUND',HttpStatus.NOT_FOUND );
            // 아이디가 있다면 비밀번호 확인 (bcrypt 모듈의 compare)
            const match= await compare(password, user.password)
            if(!match) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED );
            
            // jwt사용하여 클라이언트에 accessToken 발행하기
            // 1. payload 생성
            const payload= {
                userId,
                name: user.name
            }
            // 2. jwt.sign(페이로드, 시크릿키)메서드로 토큰생성하기 
            // const accessToken= jwt.sign(payload, 'secretKey')
            const accessToken= await this.jwtService.signAsync(payload);

            return {accessToken, user};


    }
}
