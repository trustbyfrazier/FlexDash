import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // All routes will start with /api (e.g., /api/health)
  app.setGlobalPrefix('api');

  // Allow browser requests during dev (we'll lock this down later)
  app.enableCors({ origin: true, credentials: true });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 4000;

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀 Backend running at http://localhost:${port}`);
}
bootstrap();

