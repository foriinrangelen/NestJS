import { createUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    // 회원가입 controller
    @Post()
    signUp(@Body(new ValidationPipe()) data: createUserDto){


        return this.userService.createUser(data);
    }

    login(){

    }

    me(){

    }

    @Get()
    getUsers(){
        return this.userService.getUser();
    }

}
