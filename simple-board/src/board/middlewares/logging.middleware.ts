import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

// NestJS에서는 Middleware를 만들기위해 NestMiddleware를 implements 해서 구현해야한다
export class LoggingMiddleware implements NestMiddleware {

    private readonly logger = new Logger();
    // ✅이 use method를 구현해야한다✅
    use(request: Request, response: Response, next: NextFunction) {

        const {method, originalUrl}= request;
        const startTime = Date.now();

        response.on('finish', () => {
            // console.log(response.statusMessage)
            const { statusCode }= response;
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            this.logger.log(`${method} ${originalUrl} - ${statusCode} ${response.statusMessage} - ${responseTime}ms`);
        });

        next();
    }
}