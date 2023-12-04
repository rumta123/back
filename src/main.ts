import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer } from 'http';
import * as cors from 'cors';
import { Delete } from '@nestjs/common';

async function bootstrap() {
  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, );

  // Enable CORS with specific origin and credentials
  app.enableCors({
    origin: 'http://localhost:8080', // Replace with your Vue.js app's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  });

  
  await app.listen(3000);
}
bootstrap();
