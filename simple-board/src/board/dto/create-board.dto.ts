import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

// class-validator 과 class-transformer 설치

export class CreateBoardDto {
    // @IsNotEmpty(): class-validator 설치 후 무조건 있어야 하는데이터로 만들어주기위해(데이터 유효성 검사)
    // @MinLength(), @MaxLength(): 데이터의 최소, 최대 길이 조절하기 위해
    // @MinLength(2)
    // @MaxLength(20)
    // @IsNumber()
    @IsNotEmpty()
    // ApiProperty(): Swagger 작성하기위해 사용
    @ApiProperty({
        description:"작성자 아이디",
        required:true,
        example:"1"
    })
    userId: string;

    @IsNotEmpty()
    @ApiProperty({
        description:"글 내용",
        required:true,
        example:"안녕하세요"
    })
    contents: string;
}