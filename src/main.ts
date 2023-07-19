import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN as string,
  });
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.APP_CORS_ORIGIN);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
