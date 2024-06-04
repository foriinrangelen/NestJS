# NestJS 시작하기

### NestJS를 사용하는이유
1. 모듈, 컨트롤러, 서비스 등 정형화된 아키텍처를 제공 ➡️ **유지보수에 용이**
2. 클래스, 메서드, 속성에 데코레이터 지원 ➡️ **생산성 향상**
3. 의존성주입을 통해 모듈간 유연한 결합, 코드의 유연성, 테스트 용이 ➡️ **장애 방지**
4. TypeScript 지원 ➡️ **안정성 증가**
> #### 데코레이터?
> 1. 데코레이터는 함수나 클래스 등의 코드 요소에 기능을 추가하거나 수정하는 데 사용되는 고차 함수(higher-order function)
> 2. NestJS에서 데코레이터는 클래스, 메서드, 프로퍼티, 파라미터 등에 메타데이터를 추가하여 다양한 기능을 구현하는 데 사용
> 3. NestJS의 주요 데코레이터
>    - @Controller(): 컨트롤러 클래스를 정의하는 데 사용
>    - @Get(), @Post(), @Put(), @Delete(): HTTP 요청 메서드를 라우팅하는 데 사용
>    - @Injectable(): 서비스 클래스를 정의하는 데 사용
>    - @Module(): 모듈을 정의하는 데 사용
>    - @Inject(): 의존성 주입을 수행하는 데 사용



## NestJS의 기본구조 ( Controller, Service, Module )

클라이언트 요청 ➡️ 컨트롤러가 요청을 받아 처리하기 위해 서비스로 이동 ➡️ 서비스에서 처리후 다시 Controller로 이동 <br/>
**(전부Module에 등록하여 사용)**
### Controller (app.controller.ts)
   1. NestJS에서는 HTTP 요청을 받고 응답을 반환하기위해 Controller 사용 (REST API 엔드포인트 노출)
   2. URI 엔드포인트와 HTTP 요청 메서드를 처리하는 메서드를 정의
### Service (app.service.ts)
   1. Controller에서 사용할 비즈니스 로직을 구현
   2. 서비스는 컨트롤러와 같은 클래스이며, Injectable 데코레이터를 사용하여 주입
### Module (app.module.ts)
NestJS에서 모듈은 여러 컴포넌트를 조합하여 좀 더 큰 작업을 수행할 수 있게 하는 단위이며 '@Module()' 데코레이터가 붙은 클래스를 의미, Nest가 전체 어플리케이션의 구조를 만들어나가는데 사용하기 위한 메타데이터를 제공
> #### 컴포넌트?
> 재사용 가능한 구성 요소
> #### 메타데이터?
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
