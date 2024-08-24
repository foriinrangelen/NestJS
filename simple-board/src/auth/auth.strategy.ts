import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

// passport를 사용하면 무조건 있어야 하는 전략파일이며
// PassportStrategy(Strategy)를 상속받아 구현

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,) {
        // super({ usernameField: 'userId' }); 로 이름바꿔주니 unauthorized 에러해결
        // localStrategy의 validate메서드는 username과 password를 매개변수 명으로 받는데
        // 부모 필드의 usernameField를 userId로 바꿔서 디비랑 형식을 맞춰주니 정상작동

        super({ usernameField: 'userId' });
    }
    // 2. 로컬전략의 validate 실행
    async validate(username: string, password: string) {
        console.log("들어옴");
        
        // 4. 유저가 있다면 다시 돌아와서 나머지 전략수행
        const user= await this.authService.validateUser(username, password);
        console.log(user,"222222222");
        // 유저가 없다면 401
        if(!user) {
            throw new UnauthorizedException();
            
        }
        // 있다면 유저 반환
        return user;
    }

}