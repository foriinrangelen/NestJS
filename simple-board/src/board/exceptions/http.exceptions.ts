import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";


// @Catch: HttpException이 발생했을 때 이 필터가 작동하도록 지정
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    // ExceptionFilter 를 구현하는 HttpExceptionFilter 클래스의 catch() 메서드는 예외(에러) 발생시 호출된다
    // host는 ArgumentsHost 타입의 매개변수로, NestJS에서 예외가 발생했을 때 해당 예외 필터에 전달되는 컨텍스트 정보를 담고 있으며
    // 이 매개변수를 사용하여 현재 요청의 컨텍스트에 접근할 수 있으며, HTTP, WebSocket, GRPC 등 다양한 프로토콜에 대한 정보를 제공
    // ArgumentsHost는 HTTP 뿐아니라 여러 프로토콜을 지원하기때문에 HTTP 요청과 응답에 접근하려면 host.switchToHttp()를 통해 접근해야한다
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>(); // HTTP 응답 객체를 가져옵니다.
        const request = ctx.getRequest<Request>(); // HTTP 요청 객체를 가져옵니다.
        const status = exception.getStatus(); // 발생한 예외의 상태 코드를 가져옵니다.

        // HTTP 응답을 설정하고 JSON 형태로 에러 정보를 전송
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}