import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    signUp(){

    }

    login(){

    }

    me(){

    }

    @Get()
    getUsers(){
        return this.userService.getuser();
    }

}
