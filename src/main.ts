import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.APP_PREFIX + '/' + process.env.APP_VERSION);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.APP_CORS_ORIGIN as string,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('URL Shortener')
    .setDescription('URL Shortener API Documentation')
    .setVersion('1.0')
    .addTag('url-shortener')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${process.env.APP_URL}`);
}
bootstrap();
