// src/users/users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🔹 Get all users
  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  // 🔹 Create staff
  @Post()
  @Roles('ADMIN')
  create(@Req() req, @Body() dto: CreateUserDto) {
    return this.usersService.createStaff(req.user.sub, dto);
  }

  // 🔹 Update staff
  @Patch(':id')
  @Roles('ADMIN')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateStaff(id, dto, req.user.sub);
  }

  // 🔹 Delete staff
  @Delete(':id')
  @Roles('ADMIN')
  delete(@Req() req, @Param('id') id: string) {
    return this.usersService.deleteStaff(req.user.sub, id);
  }

  // 🔹 Force password reset
  @Post(':id/reset-password')
  @Roles('ADMIN')
  reset(
    @Req() req,
    @Param('id') id: string,
    @Body('password') password?: string,
  ) {
    return this.usersService.forcePasswordReset(req.user.sub, id, password);
  }
}
