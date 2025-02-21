import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
import { Logger, ValidationPipe } from '@nestjs/common';
(global as any).crypto = crypto;

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, ()=>{
    logger.log(`Server is listening on port ${process.env.PORT}`)
  });
}
bootstrap();
