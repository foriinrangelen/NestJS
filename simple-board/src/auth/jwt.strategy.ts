import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// jwt 전략이기때문에
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/jwt/constants";

// 전략 넣기
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        // 로그인 전략을 실행해서 생성한 웹토큰은 자동으로 클라이언트의 요청헤더에 들어가고,
        // 이 요청헤더에 있는 bearer 토큰을 가져와서 검증해야하기때문에 가져오기
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpires: false,
            secretOrKey: jwtConstants.secret 
        });
    }

    // 모든 전략은 기본적으로 validate함수를 호출하도록 되어있음
    async validate(payload: {userId: string; name: string;}) {
        return payload
    }
}