import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

// ConfigModule은 NestJS에서 환경변수를 설정하기 위해 사용하는 모듈이며
// forRoot()는 ConfigModule모듈의 루트 설정을 초기화하는 역할이며 이를 통해 애플리케이션 전역에서 사용할 수 있는 환경 변수를 설정할 수있다
export default ({}={})=> ConfigModule.forRoot({
    isGlobal: true, // app.module.ts에서 import할 수 있도록 global scope로 설정
    // envFilePath: `.env.${process.env.NODE_ENV}`, //.env.development
    envFilePath: `.env.local`, 
    load: [configuration], // configuration.ts를 import
});