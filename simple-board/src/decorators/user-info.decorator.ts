import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const userInfo= createParamDecorator((data: unknown, ctx: ExecutionContext): string=>{
    // 요청의 request객체 가져오기
    const request= ctx.switchToHttp().getRequest();
    console.log(request.user)
    return request.user
});