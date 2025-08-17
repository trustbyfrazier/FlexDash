import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedJwtModule } from '../shared/jwt.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    SharedJwtModule, // provides JwtService
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], // ✅ include guard here
  exports: [AuthService], // no need to export JwtAuthGuard
})
export class AuthModule {}
