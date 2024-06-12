import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUtil {
  constructor(private configService: ConfigService) {}

  generateSessionToken(userId: number): string {
    const jwtConfig = this.configService.get('jwt');
    const claims = { userId };
    const token = sign(claims, jwtConfig.accessSecret, {
      expiresIn: jwtConfig.expiresIn,
    });
    return token;
  }
}

export default JwtUtil;