import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: "id"  }) // 순차적으로 증가하는 컬럼
    id: number;

    @ApiProperty( {description:"유저 아이디",example:"admin"} )
    @Column({ unique: true  })
    usernid: string;

    @ApiProperty ( {description:"유저 비밀번호",} )
    @Column({ select:false})
    password: string;

    @ApiProperty ( {description:"유저 이름",} )
    @Column()
    name: string;
    
}