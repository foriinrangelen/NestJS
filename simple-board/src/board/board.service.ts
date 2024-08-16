import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService 
{   
    // 엔터티를 의존성 주입받기위해 생성자에 초기화
    constructor(
        // 레포지토리(Repository)는 데이터베이스와의 상호작용을 추상화하는 패턴으로,
        // 데이터에 대한 CRUD(Create, Read, Update, Delete) 작업을 쉽게 수행할 수 있도록 도와주는 객체
        // 엔터티를 주입받고, 또 주입가능한 상태로만들어주기 위해서는 @InjectRepository()를 사용해야 하고 데코레이터 안에도 넣어줘야함
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ){}

    // 전체 테이블 가져오는 메서드: find()
    async findAll(){
        const findAllBoards= await this.boardRepository.find();
        // console.log(this.boardRepository.find())
        return findAllBoards
    }
    // 특정 게시물 하나 가져오기 : findOneBy()
    // findOneBy()는 기본적으로 where절을 포함
    // findOneBy() vs findOne(): findOneBy() where절이 필요없으며 간단하게하나를 가져올때 사용,findOne()은 where절과 orderby등 여러 sql을 사용할때 사용

    find(id: number) {
        // console.log(typeof id)        
        // return this.boardRepository.findOneBy({
        //     id: 
        // })
        const board= this.boardRepository.findOne({
            where:{
                id
            },
            relations:{
                user:true
            }
        })
        if(!board) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return board
    }

    // 게시물 생성하기: save(), create()는 생성만
    async create(data: CreateBoardDto){
        // create() 사용 예제
        // const board= await this.boardRepository.create(data)
        // board.contents= "변경"
        // return board
        //save() 사용
        const board= await this.boardRepository.save(data)
        return 
    }
    
    // // 게시물 수정하기
    // // UpdateBoardDto 사용
    // update(id: number, data: UpdateBoardDto){
    //     const index= this.getBoardId(id)

    //     if(index!=-1){
    //         this.boards[index]= {
    //            ...this.boards[index],// 기존데이터 가져와서
    //            ...data // 업데이트할 내용만 덮어쓰기
    //         }
    //         console.log(this.boards)
    //         return this.boards[index];
    //     }
    //     return null;
    // }

    // // 게시물 삭제하기
    // delete(id: number){
    //     const index= this.getBoardId(id)
    //     if(index!=-1){
    //         this.boards.splice(index, 1);
    //         return true;
    //     }
    //     return false;
    // }
    // getNextId(){
    //     return this.boards.sort((a,b)=>b.id- a.id)[0].id+ 1;
    // }

    // getBoardId(id: number) {
    //     return this.boards.findIndex(post => post.id==id);
    // }
}
