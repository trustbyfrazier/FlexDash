import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  Res,
  Logger,
  Headers,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // ✅ Logger

  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log(`Login attempt for email: ${dto.email}`);

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });
    if (!user) {
      this.logger.warn(`Login failed: user not found - ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      this.logger.warn(`Login failed: wrong password - ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.authService.login({
      id: user.id,
      role: user.role.name,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // lax for local dev
    });

    this.logger.log(`Login success: ${user.email}, accessToken issued`);
    this.logger.debug(`Refresh token set in cookie for ${user.email}`); // Debug for backend visibility

    return { accessToken };
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      this.logger.warn('Refresh token missing in request');
      throw new UnauthorizedException('No refresh token provided');
    }

    this.logger.log('Refresh token received, issuing new access token');
    const result = await this.authService.refresh(refreshToken);
    this.logger.log('New access token issued');

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Headers('authorization') authHeader: string, @Req() req: Request) {
    const token = authHeader?.split(' ')[1];

    // ✅ Logging the logout request
    this.logger.log(`🚪 Logout request from user: ${JSON.stringify(req.user)}`);

    return this.authService.logout(token);
  }
}

