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
    "seed": "ts-node -r tsconfig-paths/register ./node_modules/typeorm-extension/bin/cli.cjs seed:run",
```
1. "migration:run 실제로 create & generate한 내용을 실제로 수행
2. revert는 마지막으로 수행한 migration 기준으로 다시 원복하는 기능 수행
#### migration:create vs migration:generate 차이
둘다 migration 파일을 생성하지만 create는 빈 migration을 생성, generate는 db와 엔터티 간의 변경점을 파악하여 변경된 사항에 대한 변경점을 반영, 하지만 generate는 몇몇 case에서 수정사항을 반영할때 컬럼을 drop 하는 issue가 있어 조심해서 사용

### TypeORM Seeding을 통한 초기 데이터 생성하기
1. `yarn add typeorm-extension`
database 폴더에 seeder 폴더추가 user.seeder.ts 파일생성
seeder파일은 기본적으로 typeorm의 extension의 seeder를 implement하여 구현
```typescript
// 'src/entity/user.entity'에서 User 엔티티를 가져옵니다.
// User 엔티티는 데이터베이스에서 사용자 정보를 정의합니다.
import { User } from 'src/entity/user.entity';

// TypeORM의 DataSource 클래스를 가져옵니다.
// DataSource는 데이터베이스 연결 정보를 포함합니다.
import { DataSource } from 'typeorm';

// TypeORM Extension에서 Seeder 및 SeederFactoryManager를 가져옵니다.
// Seeder는 데이터베이스에 데이터를 삽입하는 로직을 정의하는 인터페이스입니다.
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

// UserSeeder 클래스를 정의합니다. 이 클래스는 Seeder 인터페이스를 구현합니다.
export default class UserSeeder implements Seeder {
    // run 메서드를 정의합니다. 이 메서드는 시더가 실행될 때 호출됩니다.
    // dataSource: 데이터베이스 연결 정보를 포함하는 객체입니다.
    // factoryManager: 시더 팩토리 매니저로, 시더 생성에 필요한 기능을 제공합니다.
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        // dataSource를 사용하여 User 엔티티에 대한 레포지토리를 가져옵니다.
        const repository = dataSource.getRepository(User);

        // 레포지토리를 사용하여 사용자 데이터를 데이터베이스에 삽입합니다.
        // await를 사용하여 비동기 작업이 완료될 때까지 기다립니다.
        await repository.insert([{
            // usernid 속성에 'fastcampus' 값을 할당합니다.
            // 이 값은 사용자의 고유 식별자 역할을 할 수 있습니다.
            usernid: 'fastcampus',
            
            // name 속성에 'kyy123' 값을 할당합니다.
            // 사용자의 이름을 나타냅니다.
            name: 'kyy123',
            
            // password 속성에 '1234' 값을 할당합니다.
            // 사용자의 비밀번호를 나타냅니다.
            password: '1234',
        },])
    }
}

```
