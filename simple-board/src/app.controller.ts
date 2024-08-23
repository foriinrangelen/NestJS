import { ConfigService } from '@nestjs/config';
import { Controller, Get, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // 와 같이 의존성주입을 받아 환경설정 파일을 불러올 수 있음
    private readonly configService: ConfigService, 
  ) {}
  // logger Module 사용, instance 생성시에 이 class가 선언된 클래스 안에 new Logger(AppController.name) 
  // 처럼 클래스의 name을 명시하게되면 logger가 실행된 위치까지 같이 찍힌다
  private readonly logger = new Logger(AppController.name);

  @Get()
  // custom decorator 사용해보기 
  getHello(@Ip() ip: string): string {
    // 환경변수 불러와보기
    console.log(this.configService.get<string>('ENVIRONMENT'),"1");

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
  
  // passport test 위해
  // passport 에서는 @UseGuards(AuthGuard(''))을 통해 controller의 라우터가 실행되기 전에
  // 그에따른 return된 값을 req객체에 추가해준다

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login1(@Request() req) {
    console.log(req.user)
    return req.user;
  }

}
