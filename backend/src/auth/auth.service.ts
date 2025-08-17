import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    try {
      console.log('Login DTO:', dto);

      // Find user by email and include role
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: { role: true }, // ensures role object is fetched
      });
      console.log('User found:', user);

      if (!user) {
        console.log('No user found with this email');
        throw new UnauthorizedException('Invalid credentials');
      }

      // Compare password
      const isValid = await bcrypt.compare(dto.password, user.passwordHash);
      console.log('Password valid:', isValid);

      if (!isValid) {
        console.log('Password mismatch');
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT including role name
      const accessToken = this.jwtService.sign({
        sub: user.id, // standard JWT claim for user ID
        role: user.role.name, // include role name
      });

      // Debug log
      console.log('JWT payload:', { userId: user.id, role: user.role.name });
      console.log('Access token generated:', accessToken);

      // Return the token
      return { accessToken };
    } catch (err) {
      console.error('Login error:', err);
      throw err; // rethrow so NestJS logs it
    }
  }
}
