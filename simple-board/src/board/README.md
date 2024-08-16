### simple-board/src/board


### 1. Postgres 및 TypeORM 연동하기 (기본)
```typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule(),
    //✅
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'', // 생성 계정 ID
      password:'', // 생성 계정 PW
      database:'postgres',
      entities:[__dirname + '/**/*.entity.{.ts,.js}'], // 모델을 가지고 있는 엔터티들의 위치
      synchronize: false // 엔터티가 테이블의 정의를 가지고있는데 엔터티가 변할때 이 변환값을 실제 DB에 반영할건지,(false 추천)
    }),
    //✅
    BoardModule
  ],
```

### 2. Typeorm Migration 이용해서 postgres table 생성하기
Typeorm Migration은 typeorm의 CLI로 동작하기 때문에 ts-node와 ts-config-paths 패키지 필요, .env.local 에있는 설정이 필요하기때문에 dotenv도 설정, 기존에 typeorm 모듈을 이용해서 접속을 했지만 typeORM CLI는 별도의 스크립트 이기때문에 별도로 접속할 수 있는 data-source를 만들어 줘야한
1. src/database 폴더생성, data-source.ts 파일생성
```typescript

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
    migrations: ['src/database/migrations/*.ts'], // 엔터티 변경사항이 생길 경우 이변경 사항에 대한 변경점들을 파일로 생성하여 저장하게 되는데 이파일들이 어디에 저장될지에 대한 경로
    migrationsTableName: 'migrations' ,// 마이그레이션이 실제로 DB에 적용되게 되면 적용한 내용에 대한 내용들이 기록이 되는데 이테이블에 대한 내용도 정의하기 위해
  })
```
#### package.json
"scripts": {} 에 추가
```json
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --dataSource ./src/database/data-source.ts",
    "migration:create": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create ./src/database/migrations/Migration",
    "migration:generate": "yarn typeorm migration:generate ./src/database/migrations/Migration",
    "migration:run": "yarn typeorm  migration:run",
    "migration:revert": "yarn typeorm migration:revert",
    "seed": "ts-node -r tsconfig-paths/register ./node_modules/typeorm-extension/dist/cli/index.js seed",
```
1. "migration:run 실제로 create & generate한 내용을 실제로 수행
2. revert는 마지막으로 수행한 migration 기준으로 다시 원복하는 기능 수행
#### migration:create vs migration:generate 차이
둘다 migration 파일을 생성하지만 create는 빈 migration을 생성, generate는 db와 엔터티 간의 변경점을 파악하여 변경된 사항에 대한 변경점을 반영, 하지만 generate는 몇몇 case에서 수정사항을 반영할때 컬럼을 drop 하는 issue가 있어 조심해서 사용

