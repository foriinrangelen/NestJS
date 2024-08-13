import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

// ✅NestJS에서 제공하는 내장 파이프
// validationPipe, ParseIntPipe, ParseFloatPipe, ParseArrayPipe etc. --------------------------------

// /board로 들어왔을 시
@Controller('board')
// Swagger Mapping위해 decoration 추가
@ApiTags('Board')
export class BoardController {
    // BoardService 인스턴스를 의존성주입을 받기위해 성성자 초기화
    constructor(private boardService: BoardService){}
    @Get()
    findAll(){
        return this.boardService.findAll();
    }
    // board/13 일시 Param으로 id값 가져오기
    // 에서 @Param()에 두번째 매개변수로 ParseIntPipe 넣어주면 파이프단에서 형변환이 된다
    @Get(':id')
    find(@Param('id', ParseIntPipe ) id: number) {
        console.log(typeof id)
        return this.boardService.find(id);
    }
    // 게시물 생성
    @Post()
    // ✅new ValidationPipe(): @Body 안에 new ValidationPipe() 객체를 생성해주면 DTO타입에 맞는 유효성 검사가 시작된다
    // dto 생성후 create method의 data type을 dto로 지정해주기
    create(@Body(new ValidationPipe()) data: CreateBoardDto) {
        return this.boardService.create(data);
    }

    // 게시물 업데이트
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        // class-validator 실행시키기
        @Body(new ValidationPipe()) data: UpdateBoardDto
    ) {
        return this.boardService.update(id, data);
    } 

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.boardService.delete(id);
    }
}
