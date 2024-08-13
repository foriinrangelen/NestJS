import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './board/decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // logger Module 사용, instance 생성시에 이 class가 선언된 클래스 안에 new Logger(AppController.name) 
  // 처럼 클래스의 name을 명시하게되면 logger가 실행된 위치까지 같이 찍힌다
  private readonly logger = new Logger(AppController.name);

  @Get()
  // custom decorator 사용해보기 
  getHello(@Ip() ip: string): string {
    // console.log(ip)
    // logger Module 사용하여 다양한 log 찍어보기
    // this.logger.log(ip)
    // this.logger.debug(ip)
    // this.logger.error(ip)
    // this.logger.verbose(ip)
    // this.logger.warn(ip)
    // 인위적 Exception 발생시켜보기
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.appService.getHello();
  }
}
