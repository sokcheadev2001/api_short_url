import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.APP_PREFIX + '/' + process.env.APP_VERSION);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN as string,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${process.env.APP_URL}`);
}
bootstrap();
