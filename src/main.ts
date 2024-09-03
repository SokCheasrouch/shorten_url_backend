import 'dotenv/config';
import { CustomExceptionFilter, ResponseInterceptor } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}

bootstrap();
