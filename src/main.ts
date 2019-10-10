import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('nanokey')
    .setDescription('Nanokey distributed, tiny key value store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_docs', app, document);

  await app.listen(process.env.NODE_PORT ? process.env.NODE_PORT : 3000);
}
bootstrap();
