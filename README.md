# NestJS 시작하기

### NestJS를 사용하는이유
1. 모듈, 컨트롤러, 서비스 등 정형화된 아키텍처를 제공 ➡️ **유지보수에 용이**
2. 클래스, 메서드, 속성에 데코레이터 지원 ➡️ **생산성 향상**
3. 의존성주입을 통해 모듈간 유연한 결합, 코드의 유연성, 테스트 용이 ➡️ **장애 방지**
4. TypeScript 지원 ➡️ **안정성 증가**
> #### 🤔 데코레이터?
> 1. 데코레이터는 함수나 클래스 등의 코드 요소에 기능을 추가하거나 수정하는 데 사용되는 고차 함수(higher-order function)
> 2. NestJS에서 데코레이터는 클래스, 메서드, 프로퍼티, 파라미터 등에 메타데이터를 추가하여 다양한 기능을 구현하는 데 사용
> 3. 해당 코드의 동작을 선언적으로 수정하거나 확장
> 4. NestJS의 주요 데코레이터
>    - @Controller(): 컨트롤러 클래스를 정의하는 데 사용
>    - @Get(), @Post(), @Put(), @Delete(): HTTP 요청 메서드를 라우팅하는 데 사용
>    - @Injectable(): 서비스 클래스를 정의하는 데 사용
>    - @Module(): 모듈을 정의하는 데 사용
>    - @Inject(): 의존성 주입을 수행하는 데 사용

## NestJS의 기본구조 ( Controller, Service, Module )

클라이언트 요청 ➡️ 컨트롤러가 요청을 받아 처리하기 위해 서비스로 이동 ➡️ 서비스에서 처리후 다시 Controller로 이동 <br/>
**(전부Module에 등록하여 사용)**
### 1. Controller (app.controller.ts)
   1. NestJS에서는 HTTP 요청을 받고 응답을 반환하기위해 Controller 사용 (REST API 엔드포인트 노출)
   2. URI 엔드포인트와 HTTP 요청 메서드를 처리하는 메서드를 정의
#### Routing 예시
``` typescript
@Controller('hello')// ✅Controller decorater 안에 문자열로 경로를 넣으면 prefix로 작동
export class HelloController {
   @Get() 
   get(): string {
      return 'get';
   }
   @Post()
   create(): string {
      return 'create';
   }
   @Put()
   update(): string {
      return 'update';
   }
   @Delete()
   remove(): string {
      return 'remove';
   }
}
// ✅ 매개변수와 쿼리스트링 예시
// HTTP GET /hello/kyy?country=korea
   @Get(':name')
   get(
      @Param('name') name: string, // @Param: 매개변수
      @Query('Country') country: string // @Query: 쿼리스트링
) {
      return `my name is ${name} from ${country}` // 'my name is kyy from korea'
}
// request객체를 전부 가져오고 싶다면 @Request
```
### 2. Service (app.service.ts)
   1. Controller에서 사용할 일반적인 비즈니스 로직을 구현(담당)
   2. 서비스는 컨트롤러와 같은 클래스이며, Injectable 데코레이터를 사용하여 주입
   3. 데이터베이스의 데이터를 가져오거나 외부API 호출등의 데이터 처리
> #### 🤔 DI (Dependency Injection, 의존성 주입)이란?
> 소프트웨어 엔지니어링 디자인 패턴 중 하나, 특정 클래스가 의존하고 있는 다른 클래스나 컴포넌트를 직접 만들지 않고, 외부에서 주입받아 사용하는 방식으로 모듈간의 결합도를 높이고 유연성과 재사용성을 높이고자 나온 패턴
> Nest에서는 DI로 인해 Class는 의존성을 직접 관리할 필요가 없이 독립적으로 유지할수 있게되며 이로인해 단위테스트를 수월하게 진행할 수 있게 된다
> #### DI 동작방식
> 1. 클래스는 필요한 의존성을 명시적으로 정의 (대체로 생성자 매개변수로 이루어짐)
> 2. DI 컨테이너 또는 loC(Inversion of Control)컨테이너는 이러한 의존성을 관리, 이 컨테이너는 필요한 의존성을 찾아서 인스턴스를 생성하고, 이를 요청한 클래스에 주입
> 3. 클래스는 직접적으로 의존성을 생성하거나 관리할 필요없이 해당 의존성을 사용할 수 있게 된다
>    ```typescript
>    // DI 예시
>    // cats.controller.ts
>    import { Controller, Get, Post, Body } from '@nestjs/common';
>    import { CatsService } from './cats.service';
>    import { Cat } from './interfaces/cat.interface';
>    @Controller('Cats')
>    export class CatsController {
>      constructor(private catsService: CatsService) {} // CatsService의 인스턴스를 CatsController의 private 멤버로 주입
>
>      @Post()
>      async create(@Body() cat: Cat) { // 요청 본문에 있는 고양이 데이터를 받아서 처리
>        this.catsService.create(cat); // 주입받은 CatsService의 create 메소드를 호출하여 고양이 데이터를 저장
>      }
>    
>      @Get()
>      async findAll(): Promise<Cat[]> {  // 모든 고양이 데이터를 찾아 반환합니다. 반환 타입은 Promise<Cat[]>
>       return this.catsService.findAll();  // 주입받은 CatsService의 findAll 메소드를 호출하여 모든 고양이 데이터를 가져오기
>      }
>    }
>      // ✅ module에 providers에 명시되지 않은 service는 의존성 주입이 되지않음❗
>    ```
#### Service예시
```typescript
@Injectable() // 다른곳에서 사용가능하도록 주입가능한 클래스로 변경하기위해 사용 (DI, dependency injection)
export class AppService {
   getHelloWorld(): string {
      return 'Hello World!';
   }
}

// controller
@controller()
export class AppController {
  // AppService에서 @injectable된 class는 controller에 private형태로 주입되고,
  // 이렇게 주입된 class는 AppController에서 인스턴스를 생성하는게 아니라
  // Nest자체에서 AppService에 대한 인스턴스를 생성하여 AppController에 전달해서
  // 전달받은 인스턴스를 AppController에서 사용할 수 있게 된다
  constructor(private readonly ✅appService: AppService) { // 전달받은 인스턴스 사용

  @Get()
  getHello(): string {
    return this.appService.getHelloWorld();
  }
}
}
```
### 3. Module (app.module.ts)
NestJS에서 모듈은 여러 컴포넌트를 조합하여 좀 더 큰 작업을 수행할 수 있게 하는 단위이며 '@Module()' 데코레이터가 붙은 클래스를 의미, Nest가 전체 어플리케이션의 구조를 만들어나가는데 사용하기 위한 메타데이터를 제공
> #### 🤔 컴포넌트?
> 재사용 가능한 구성 요소
> #### 🤔 메타데이터?
> "데이터에 대한 데이터"이며, 다른 데이터를 설명하거나 이해하는 데 사용되는 정보
   1. NestJS에서는 모듈을 사용하여 애플리케이션을 구성
   2. 모듈은 특정 기능 또는 비즈니스 로직을 담당하는 컴포넌트의 집합
   3. 애플리케이션에 필요한 모든 Controller, Service, Provider, Middleware 등을 전부 모듈에 등록
```typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from '../common/common.module'

@Module({
  imports: [CommonModule], // 모듈이 의존하는 다른 모듈의 배열, NestJS에서는 이러한 모듈들을 현재 모듈의 providers와 controllers가 사용할 수 있도록 제공
  controllers: [AppController], // HTTP 요청을 처리하는 클래스를 등록
  providers: [AppService], // 서비스, 리포지토리 등의 클래스를 등록하여 해당 모듈 내에서 주입할 수 있도록 설
  exports: [AppService], // 모듈에서 제공, 다른 모듈에서 import하여 사용할 수 있는 providers의 배열
})
export class AppModule {}

// 1️⃣ 공유 모듈 ( Shared Modules ): 애플리케이션 전반에 공유되는 기능을 제공,
// ex) 데이터 베이스 접속, 로깅 인증 등 공통적인 작업을 수행하는 기능등을 Shared 모듈로 구성할 수있음
import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'

@Global() // ✅ 애플리케이션 전역적으로 사용되는 모듈이라면 Global 데코레이터를 통해 전역적으로 설정 가능
          // Global 데코레이터가 명시되어있는 모듈은 imports 없이 사용가능하며, ✅보통 애플리케이션의 루트나 코어 부분에 구현
@Module({
  providers: [UsersService],
  exports: [DatabaseService], 
})
export class DatabaseModule {}

// 2️⃣ 기능 모듈 ( Feature Modules ): 애플리케이션의 특정 기능을 캡슐화 시킬때사용(관련된 기능들을 하나의 모듈로 묶어 캡슐화하여 코드의 명확성과 유지보수성을 향상)
// ex) 사용자관리, 상품관리, 주문처리 등 특정 기능에 대해 컨트롤러, 서비스, 리포지토리 등을 그룹화
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DatabaseService } from './database.service'

@Module({
  imports: [DatabaseModule], // ✅UsersModule에서 사용하기위해 imports 필드에 등록, 만약 DatabaseModule이 @Global()이 되어있다면 import필요없음
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

```

#### Provider
   - NestJS에서는 **Provider를 통해 의존성 주입**을 관리하며, 프로바이더는 컨트롤러나 서비스에서 사용하는 객체, 함수등을 제공

### NestJS프로젝트 구조
#### Main.ts?
NestJS 애플리케이션의 진입점(HTTP 서버시작)이며 NestFactory 클래스를 사용하여 NestJS애플리케이션을 생성하고 생성된 애플리케이션에 필요한 미들웨어 및 모듈을 등록하여 사용, NestJS에서 사용하고자 하는 모듈이 있는경우 Main.ts의 AppModule에 등록되어야 사용가능하다

### API 문서화(Swagger) 하기 `https://docs.nestjs.com/openapi/introduction`
API설계, 구축, 문서화, 테스트 하는 과정을 돕는 프레임워크, 주로 API를 직관적인 문서화 할 수 있도록 하는데 활용
1. YAML, JSON 형식의 API스펙을 작성, 작성된 스펙을 기반을 웹페이지 형태로 문서화
2. NestJS에서는 @nestjs/swagger를 통해 설정, 데코레이터를 통해 API 스펙을 명세
3. `yarn add @nestjs/swagger`
```typescript
@Get('./all')
@ApiOperation({ summary: '유저 가져오기' })
@ApiOkResponse({
   type: User,
   description: '전체 유저를 반환합니다',
})
@ApiNotFoundResponse({
   description: '잘못된 요청입니다.',
})
async getAllUsers() {
   return this.userService.getAllusers();
}
```
#### main.ts
```typescript

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // add
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// 추가
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
// 태그 기준으로 Controller와 mapping
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
// api 경로수정
  SwaggerModule.setup('api', app, document);
//
  await app.listen(3000);
}
bootstrap();
```

