### NestJS 프로젝트 시작하기
1. ```
   npm install --global yarn
   ```
2. ```
   yarn global add @nestjs/cli
   ```
3. ``` 
   nest new simple-board
   ```
4. ``` 
   yarn start / yarn start:dev
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
