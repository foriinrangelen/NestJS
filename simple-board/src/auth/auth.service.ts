import { compare } from 'bcrypt';
import { UserService } from './../routers/user/user.service';
import { Injectable } from '@nestjs/common';

console.log("들어옴")
@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
    ){}

    async validateUser(username: string, password: string){
        console.log("들어옴")
        const user= await this.UserService.getUserByUserId(username);
        console.log("들어옴")
        if(user) {
            const match= await compare(password, user.password);

            if(match) return user;
            // passport의 형식을 맞추기위해 null return
            else return null;
        }
        // passport의 형식을 맞추기위해 null return
        return null
        

    }

}
