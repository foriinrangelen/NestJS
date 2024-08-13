import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './board/decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // custom decorator 사용해보기 
  getHello(@Ip() ip: string): string {
    console.log(ip)
    // 인위적 Exception 발생시켜보기
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return this.appService.getHello();
  }
}
