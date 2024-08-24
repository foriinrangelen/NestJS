### NestJS 프로젝트 시작하기
#### 1. npm 으로 yarn 설치
```
npm install --global yarn
```
#### 2. yarn 으로 nestjs/cli 설치
```
yarn global add @nestjs/cli
```
#### 3. 새로운 NestJS프로젝트 생성
``` 
nest new simple-board
```
#### 4. 프로젝트 서버 시작
``` 
yarn start / yarn start:dev
```
#### git clone 후 의존성 설치
```
> directory 이동 후 yarn install
```
#### 5. DTO 사용위해 class validator 와 class-transformer 설치
``` 
yarn add class-validator class-transformer
```
#### 6. NestJS에서 환경설정 위해 ConfigModule 설치하기
``` 
yarn add @nestjs/config
```
#### 7. NestJS에서 TypeORM과 Postgres 연동위해 @nestjs/typeorm, typeorm, pg 설치
``` 
yarn add @nestjs/typeorm typeorm pg
```
#### 8. TypeORM Migrations 사용하기위해 ts-node, tsconfig, dotenv설치
``` 
yarn add ts-node, tsconfig-paths dotenv
```
#### 9. 비밀번호 hash화 위해 bcrypt설치 (서버단에서는 bcrypt 쓰자)
``` 
yarn add bcrypt
```
#### ~~10. jwt 사용위해 jsonwebtoken 설치~~ 패스포트에서 jwt사용 위해
``` 
yarn add @nestjs/jwt passport-jwt -D @types/passport-jwt
```
#### 11. passport 사용위해(passport-local은 타입추가설치)
``` 
yarn add @nestjs/passport passport passport-local -D @types/passport-local
```
> #### nvm (node version manager)사용해보기
> 노드버전 관리를 위해사용
> ```
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
> ```
> `nvm use v19.7.0`

### 개행 에러 해결하기
> #### VSCode - Delete `CR` eslint(prettier/prettier) 에러 해결법
> 위 오류는 windows에서 발생하는 오류로, 
prettier의 기본 라인 개행 방식(lf)이 windows의 개행 방식(crlf)과 다르기 때문에 발생
> 
> .eslintrc.js 파일에서 'prettier/prettier': ['error', { endOfLine: 'LF' }], 를 rules에 추가
