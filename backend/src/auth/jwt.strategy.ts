// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    });
  }

  // return the exact fields you want on request.user
  async validate(payload: any) {
    // keep the claim names consistent with what we sign in AuthService.generateTokens
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role, // <-- include role so RolesGuard can read it
    };
  }
}

