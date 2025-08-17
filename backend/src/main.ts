import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // ✅ Register global JWT guard
  const jwtGuard = app.get(JwtAuthGuard); // Nest injects JwtService automatically
  app.useGlobalGuards(jwtGuard);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: true, credentials: true });

  await app.listen(3000);
  Logger.log(`🚀 Backend running at http://localhost:3000`, 'Bootstrap');
}

bootstrap();
