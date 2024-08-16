### Postgres 및 TypeORM 연동하기
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
