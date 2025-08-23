import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable cookie parsing
  app.use(cookieParser());

  // ✅ Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // ✅ Register global JWT guard
  const jwtGuard = app.get(JwtAuthGuard); // Nest injects JwtService automatically
  app.useGlobalGuards(jwtGuard);

  // ✅ Set global prefix & enable CORS with credentials support (frontend on :3000)
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(5000);
  Logger.log(`🚀 Backend running at http://localhost:5000`, 'Bootstrap');
}

bootstrap();
