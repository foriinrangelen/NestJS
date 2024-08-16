import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";

// @Entity(): 이 클래스가 데이터베이스의 테이블에 해당함을 나타내며 클래스명은 기본적으로 테이블명으로 사용
@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: "id"  }) // 순차적으로 증가하는 컬럼
    id: number;

    @ApiProperty( {description:"유저 아이디",example:"admin"} )
    @Column({ unique: true  }) // @Column({ unique: true }): 이 필드가 데이터베이스에서 유일한 값이어야 함
    userId: string;

    @ApiProperty ( {description:"유저 비밀번호",} )
    @Column({ select:false}) // @Column({ select: false }): 이 필드는 쿼리에서 기본적으로 선택되지 않도록 설정, 비밀번호와 같은 민감한 정보를 숨기기 위해 사용
    password: string;

    @ApiProperty ( {description:"유저 이름",} )
    @Column()
    name: string;
    
    @ApiProperty ({description: "작성한 게시글",} )
    // 1:N의 관계 (User - Board)
    // @OneToMany(): User와 Board 간의 1:N 관계를 정의 즉, 하나의 User는 여러 개의 Board를 가질 수 있음
    // boards: Board[];: 이 필드는 User가 작성한 게시글들을 배열 형태로 저장, 실제 DB 테이블의 컬럼은 아님
    // 첫 번째 인자 () => Board
    // 이 부분은 관계의 대상이 되는 엔터티를 지정
    // () => Board는 화살표 함수 형태로, Board 엔터티를 반환, 이렇게 하는 이유는 TypeScript의 순환 참조 문제를 피하기 위해
    // 즉, 여기서 User가 Board를 참조하고 있음을 명시

    // 두 번째 인자 (board) => board.user
    // 이 부분은 관계에서 Board 엔터티가 어떤 속성을 통해 User와 연결되는지를 명시
    // board.user는 Board 엔터티 내에 있는 user 속성을 참조합니다.
    // 즉, 각 Board 객체는 작성자(User)에 대한 참조를 가지고 있으며, 이 참조가 User와의 관계를 정의
    // => 첫 번째 인자는 관계의 대상인 Board를 명시하고, 두 번째 인자는 Board가 User와 연결되는 방식을 정의
    @OneToMany(() => Board, (board) => board.user)
    boards: Board[]; // 이 boards는 실제 DB table의 column명이 아니고 값을 Boards라는 필들안에 받아오기 위한 가상의 column배열
                     // 이 안의 속성은 이제 board entity의 속성을 가지고 있다
}