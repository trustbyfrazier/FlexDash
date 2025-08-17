import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedJwtModule } from '../shared/jwt.module'; // needed for JwtService injection

@Module({
  imports: [PrismaModule, SharedJwtModule], // <- ensures JwtService can be injected
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
