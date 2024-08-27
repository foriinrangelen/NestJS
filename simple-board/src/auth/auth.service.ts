import { compare } from 'bcrypt';
import { UserService } from './../routers/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';

console.log("들어옴")
@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UserService,
        private readonly jwtService: JwtService,
    ){}

    // 3. 전략 실행중 필요한 로직 service에서 실행
    async validateUser(username: string, password: string){
        console.log("들어옴")
        const user= await this.UserService.getUserByUserId(username);
        console.log("들어옴")
        if(user) {
            const match= await compare(password, user.password);
            
            // 유저가 맞을 경우에만 user를 반환해서 전략에서 나머지 전략수행
            if(match) return user;
            // passport의 형식을 맞추기위해 null return
            else return null;
        }
        // passport의 형식을 맞추기위해 null return
        return null
        

    }

    // 로그인 로직 auth.service로 이관하기
    // 6. jwt를 생성하기위한 페이로드 구성 후 accessToken 생성
    async login(user: User) {
        const payload= {
            // 토큰을 발행할때 id까지 발행, 웹토큰을 복호하면 id를 같이 알아낼 수 있다
            id: user.userNo,
            userId: user.userId,
            name: user.name
        };

        return { accessToken: this.jwtService.sign(payload)}
        
    }

}
