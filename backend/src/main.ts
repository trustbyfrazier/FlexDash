import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp, context, stack }) => {
            return `${timestamp} [${level}]${context ? ' [' + context + ']' : ''} ${message}${
              stack ? '\n' + stack : ''
            }`;
          })
        ),
      }),
      new winston.transports.File({
        filename: 'logs/app.log',
        level: 'info',
        format: winston.format.json(),
        maxsize: 5_000_000,
        maxFiles: 3,
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.json(),
        maxsize: 5_000_000,
        maxFiles: 3,
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger });

  app.setGlobalPrefix('api');
  app.enableCors({ origin: true, credentials: true });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 4000;

  await app.listen(port);
  Logger.log(`🚀 Backend running at http://localhost:${port}`, 'Bootstrap');
}
bootstrap();

