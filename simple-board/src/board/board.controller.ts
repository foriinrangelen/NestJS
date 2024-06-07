import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

// /board로 들어왔을 시
@Controller('board')
export class BoardController {
    // BoardService 인스턴스를 의존성주입을 받기위해 성성자 초기화
    constructor(private boardService: BoardService){}
    @Get()
    findAll(){
        return this.boardService.findAll();
    }
    // board/13 일시 Param으로 id값 가져오기
    @Get(':id')
    find(@Param('id') id: number) {
        console.log(typeof id)
        return this.boardService.find(Number(id));
    }
    // 게시물 생성
    @Post()
    create(@Body() data) {
        return this.boardService.create(data);
    }
    // 게시물 업데이트
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() data
    ) {
        return this.boardService.update(Number(id), data);
    } 

    @Delete(':id')
    remove(
        @Param('id') id: number,
    ) {
        return this.boardService.delete(Number(id));
    }
}
