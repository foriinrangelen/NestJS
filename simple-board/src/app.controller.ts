import { ConfigService } from '@nestjs/config';
import { Controller, Get, HttpException, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // 와 같이 의존성주입을 받아 환경설정 파일을 불러올 수 있음
    private readonly configService: ConfigService,
    // 로그인인증 로직 사용위해
    private readonly authService: AuthService, 
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
  // 1. @UseGuards(LocalAuthGuard)를 통해 로컬 로그인 전략 실행
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // 5. 전달된 유저값은 request 객체의 유저로 전달되게 되고 이전달된 req.user는 다시 auth.service의 로그인으로 전달
  async login(@Request() req) {
    // console.log(req.user)
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user
  }

}
