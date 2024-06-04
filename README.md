# NestJS 시작하기

### NestJS를 사용하는이유
1. 모듈, 컨트롤러, 서비스 등 정형화된 아키텍처를 제공 ➡️ **유지보수에 용이**
2. 클래스, 메서드, 속성에 데코레이터 지원 ➡️ **생산성 향상**
3. 의존성주입을 통해 모듈간 유연한 결합, 코드의 유연성, 테스트 용이 ➡️ **장애 방지**
4. TypeScript 지원 ➡️ **안정성 증가**

### NestJS의 기본구조
클라이언트 요청 => 컨트롤러가 요청을 받아 처리하기 위해 서비스로 이동 => 서비스에서 처리후 다시 Controller로 이동 = 처리를 위해 Module에 등록되있어야한
#### Controller (app.controller.ts)
   - NestJS에서는 HTTP 요청을 처리하기 위해 Controller 사용
   - 컨트롤러는 URI 엔드포인트와 HTTP 요청 메서드를 처리하는 메서드를 정의
#### Service (app.service.ts)
   - Controller에서 사용할 비즈니스 로직을 구현
   - 서비스는 컨트롤러와 같은 클래스이며, Injectable 데코레이터를 사용하여 주입
#### Module (app.module.ts)

    
