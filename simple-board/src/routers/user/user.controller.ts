import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserService } from './user.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    // 회원가입 controller
    @Post()
    signUp(@Body(new ValidationPipe()) data: CreateUserDto){


        return this.userService.createUser(data);
    }

    // 로그인 controller
    @Post('login')
    login(@Body(new ValidationPipe()) data: LoginUserDto){

        return this.userService.login(data);
    }

    me(){

    }

    @Get()
    // 인터셉터 추가로 entity에서 @Exclude()한 컬럼은 직렬화 과정에서 빠진다
    @UseInterceptors(ClassSerializerInterceptor)
    getUsers(){
        return this.userService.getUser();
    }

}
