import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import SwaggerSetup from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  app.use(helmet());

  app.use(compression());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  if (env === 'development') {
    SwaggerSetup(app);
  }

  await app.listen(port);
  if (env === 'development') {
    console.log(`App running on port: ${port}, http://localhost:${port}`);
  }
}
bootstrap();
