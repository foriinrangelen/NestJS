import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBoardDto {
    // 어느것을 수정할지 모르니 optional로 설정
    // class-validator 같은경우 필수조건이라기보다 타입을 명확하게 하기위한 조건이기때문에 번거롭다면 빼도된다
    // 작성자를 수정할 순 없으니 제거
    // @MinLength(2)
    // @MaxLength(20)
    // @IsOptional()
    // userId?: string;


    // @IsOptional()
    @IsNotEmpty() // 무조건 수정이 되야 하기 때문에
    @ApiProperty({
        description:"내용",
        required:true,
        example:"글 내용 수정"
    })
    contents: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// 와 같이 PartialType(CreateBoardDto)을 확장해서 옵셔널하게 만들어줄수도 있지만
// CreateBoardDto에서 사용하는 class-validator인 @IsNotEmpty() 의 영향을 받기때문에
// 목적에 맞게 사용하기
// 몇몇의 경우에는 옵셔널하기보다 무조건 수정되어야 하는 필드가 있을수도 있음, 이럴경우
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {}
// 과 같이 PickType()을 사용해서 특정 필드를 지정해주거나
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['name']) {}
// 와 같이 OmitType()을 사용해서 특정필드를 제외할 수 있다

// ✅ PickType
// PickType은 특정 필드만 선택하여 새로운 DTO를 생성합니다. 이 경우, 선택된 필드는 필수로 남아 있습니다.
// 따라서 특정 필드만 업데이트할 수 있도록 제한하고 싶을 때 유용합니다.

// ✅ OmitType
// OmitType은 주어진 DTO에서 특정 필드를 제외한 새로운 DTO를 생성합니다. 제외된 필드는 새로운 DTO에 포함되지 않으며, 나머지 필드는 그대로 유지됩니다.
//이 경우, 제외된 필드는 업데이트할 수 없는 필드로 설정할 수 있습니다.