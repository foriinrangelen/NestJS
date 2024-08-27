import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { userInfo } from 'src/decorators/user-info.decorator';

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
    find(@Param('id', ParseIntPipe ) boardNo: number) {
        console.log(typeof boardNo)
        return this.boardService.find(boardNo);
    }


    // 게시물 생성
    @Post()
    // 게시물 생성할때, jwt 토큰이 유효한지 확인
    @UseGuards(JwtAuthGuard)
    // ✅new ValidationPipe(): @Body 안에 new ValidationPipe() 객체를 생성해주면 DTO타입에 맞는 유효성 검사가 시작된다
    // dto 생성후 create method의 data type을 dto로 지정해주기
    // @userInfo() 커스템 데코레이터에서 request 객체를 userInfo로 가져오고 request객체의 id 가져오기
    create(
        @userInfo() userInfo, 
        // @Body(new ValidationPipe()) 
        // data: CreateBoardDto
        // 요청에서 바디에 담긴 contents만 가져오기
        @Body('contents')  contents: string
    ) {    
        console.log(userInfo,"1111111111111111")
        console.log(userInfo.userId)
        console.log(contents)
        // 어차피 로그인이 안되면 @UseGuards(JwtAuthGuard)에서 걸리지만 안전하게 예외처리
        if(!userInfo) throw new UnauthorizedException();

        return this.boardService.create({
            userId: userInfo.userId,
            contents
        });
    }


    // 게시물 업데이트
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(        
        @userInfo() userInfo, 
        @Param('id', ParseIntPipe) boardNo: number,
        // class-validator 실행시키기
        @Body(new ValidationPipe()) data: UpdateBoardDto,
    ) {
        console.log(userInfo,"1111111111111111")
        return this.boardService.update(userInfo.userId, boardNo, data);
    } 
    
    // 게시물 삭제
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(
        @userInfo() userInfo, 
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.boardService.delete(userInfo.userId, id);
    }
}
