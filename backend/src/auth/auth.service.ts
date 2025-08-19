import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtUserPayload {
  id: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Login a user and generate JWTs
   * @param user object containing at least { id, role }
   */
  async login(user: JwtUserPayload) {
    const payload = { sub: user.id, role: user.role };

    // Generate access and refresh tokens
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Optionally, save refreshToken in DB to allow revocation

    return { accessToken, refreshToken };
  }

  /**
   * Refresh access token using a valid refresh token
   * @param refreshToken JWT refresh token
   */
  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken) as JwtUserPayload;

      // Optionally, check if refreshToken is still valid in DB

      const newAccessToken = this.jwtService.sign(
        { sub: payload.id, role: payload.role },
        { expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
