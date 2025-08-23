import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedJwtModule } from '../shared/jwt.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';  // <-- import strategy

@Module({
  imports: [
    SharedJwtModule, // provides JwtService
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,   // <-- register it here
  ],
  exports: [AuthService],
})
export class AuthModule {}

