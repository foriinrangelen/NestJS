
import { DataSource } from 'typeorm'


import  {config } from 'dotenv' // dotenv 사용위해

config({path: '.env.local'}); // .env가 아니라 .env.local 이기때문에 설정
export default new DataSource({
    type:'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:['src/**/*.entity.{.ts,.js}'], // 모델을 가지고 있는 엔터티들의 위치
    synchronize: false, // 엔터티가 테이블의 정의를 가지고있는데 엔터티가 변할때 이 변환값을 실제 DB에 반영할건지,(false 추천)
    migrations: ['src/database/migrations/*.ts'],   // 엔터티 변경사항이 생길 경우 이변경 사항에 대한 변경점들을 파일로 생성하여 저장하게 되는데 이파일들이 어디에 저장될지에 대한 경로
    migrationsTableName: 'migrations' , // 마이그레이션이 실제로 DB에 적용되게 되면 적용한 내용에 대한 내용들이 기록이 되는데 이테이블에 대한 내용도 정의하기 위해
  })


