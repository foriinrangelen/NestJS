import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './board/exceptions/http.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 직접만든 ExceptionFilter를 사용하기 위해 useGlobalFilters()에 new HttpExceptionFilter()를 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
  .setTitle('Simple Board')
  .setDescription('The Simple Board API description')
  .setVersion('1.0')
  .addTag('Board')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
