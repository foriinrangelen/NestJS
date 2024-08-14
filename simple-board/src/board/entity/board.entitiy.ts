import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entitiy";


@Entity() // @Entity({name: ''}) 처럼 Entity안에 name을 따로 명시해주지않으면 class명이 table명과 mapping 된다
export class Board {
    @PrimaryGeneratedColumn({ name: "id"  })
    id: number;

    @ApiProperty ( {description:"유저아이디",} )
    @Column() // 만약 연결한 DB의 column명이 다르다면 @Column({name: ''}) 처럼 decorator안에 넣어줘서 맞출 수 있다
    userId: string;

    @ApiProperty ({description:"글 제목",} )
    @Column()
    title: string;

    @ApiProperty ({description:"글 내용",} )
    @Column()
    content: string;
    
    @ApiProperty( {description:"글 수정일",} )
    @UpdateDateColumn()
    updateAt: Date;
    
    @ApiProperty ({description:"글 생성일",} )
    @CreateDateColumn()
    createAt: Date;

    @ApiProperty ({description: "유저 정보",} )
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" }) // 실제 table의 column과 엔터티 column간 이름이 다르다면 @JoinColumn({ name: "user_id" })처럼 맞게 설정해줘야함(join위해)
    // 이 경우, userId라는 컬럼이 Board 테이블에 존재하게 되며, 이 컬럼은 게시글이 작성된 사용자의 ID를 참조
    // N쪽에는 복수, 1쪽에는 단수
    user: User;
}