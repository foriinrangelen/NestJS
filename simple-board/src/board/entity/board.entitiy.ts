import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
}