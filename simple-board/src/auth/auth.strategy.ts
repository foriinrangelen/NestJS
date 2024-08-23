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
    
    async validate(username: string, password: string) {
        console.log("들어옴");
        const user= await this.authService.validateUser(username, password);
        console.log(user,"222222222");
        if(!user) {
            throw new UnauthorizedException();
            
        }
        return user;
    }

}