import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

// class-validator 과 class-transformer 설치

export class CreateBoardDto {
    // @IsNotEmpty(): class-validator 설치 후 무조건 있어야 하는데이터로 만들어주기위해(데이터 유효성 검사)
    // @MinLength(), @MaxLength(): 데이터의 최소, 최대 길이 조절하기 위해
    @MinLength(2)
    @MaxLength(20)
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}