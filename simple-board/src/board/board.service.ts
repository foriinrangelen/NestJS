import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    private boards= [{
        id: 1,
        title: 'title1',
        content: 'content1'
    },{
        id: 2,
        title: 'title2',
        content: 'content2'
    },{
        id: 3,
        title: 'title3',
        content: 'content3'
    },{
        id: 4,
        title: 'title4',
        content: 'content4'
    },{
        id: 5,
        title: 'title5',
        content: 'content5'
    },{
        id: 6,
        title: 'title6',
        content: 'content6'
    },{
        id: 7,
        title: 'title7',
        content: 'content7'
    },{
        id: 8,
        title: 'title8',
        content: 'content8'
    },{
        id: 9,
        title: 'title9',
        content: 'content9'
    },{
        id: 10,
        title: 'title10',
        content: 'content10'
   },
]
    // 전체 테이블 가져오는 메서드
    findAll(){
        return this.boards.sort((a,b)=>a.id- b.id);
    }
    // 특정 게시물 하나 가져오기
    find(id: number) {
        console.log(typeof id)
        // const index= this.boards.findIndex(post => post.id==id);
        // return this.boards[index]
        return this.boards.filter(post => post.id===id);
    }
    // 게시물 생성하기
    create(data: CreateBoardDto){
        const newBoard= {
            id: this.getNextId(),
            // id: this.boards.length+1,
            ...data
        }
        this.boards.push(newBoard);
        return newBoard;
    }
    // 게시물 수정하기
    update(id: number, data: any){
        const index= this.getBoardId(id)

        if(index!=-1){
            this.boards[index]= {
               ...this.boards[index],// 기존데이터 가져와서
               ...data // 업데이트할 내용만 덮어쓰기
            }
            return this.boards[index];
        }
        return null;
    }

    // 게시물 삭제하기
    delete(id: number){
        const index= this.getBoardId(id)
        if(index!=-1){
            this.boards.splice(index, 1);
            return true;
        }
        return false;
    }
    getNextId(){
        return this.boards.sort((a,b)=>b.id- a.id)[0].id+ 1;
    }

    getBoardId(id: number) {
        return this.boards.findIndex(post => post.id==id);
    }
}
