import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @MinLength(5)
    @MaxLength(20)
    @IsNotEmpty()
    userId: string;

    @MinLength(5)
    @IsNotEmpty()
    password: string;

    @MinLength(2)
    @IsNotEmpty()
    name: string;


    // // 이메일 형식에 맞는지
    // @IsEmail()
    // email: string;

    // // 한국 전화번호 형식에 맞는지
    // @IsPhoneNumber('KR')
    // phoneNumber: string;

    // // F 와 M 이 아니라면 에러
    // @IsIn(['F','M'])
    // gender: string;

}