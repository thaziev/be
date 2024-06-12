import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/users.repository';
import { LoginAttemptRepository } from 'src/repositories/login-attempts.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/entities/users';
import { LoginAttempt } from 'src/entities/login_attempts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loginAttemptRepository: LoginAttemptRepository
  ) {}

  async authenticateUser(email: string, password: string): Promise<{ token: string; userId: number; message: string }> {
    if (!email || !password) {
      throw new BadRequestException('Missing email or password');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      await this.logLoginAttempt(email, false);
      throw new BadRequestException('Invalid credentials');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordIsValid) {
      await this.logLoginAttempt(email, false, user.id);
      throw new BadRequestException('Invalid credentials');
    }

    await this.logLoginAttempt(email, true, user.id);
    await this.userRepository.update(user.id, { last_login: new Date() });

    const token = this.generateSessionToken(user.id);
    return {
      token,
      userId: user.id,
      message: 'Authentication successful'
    };
  }

  private async logLoginAttempt(email: string, success: boolean, userId?: number): Promise<void> {
    const loginAttempt = new LoginAttempt();
    loginAttempt.attempt_time = new Date();
    loginAttempt.success = success;
    loginAttempt.user_id = userId;
    await this.loginAttemptRepository.save(loginAttempt);
  }

  private generateSessionToken(userId: number): string {
    return jwt.sign({ userId }, 'secret', { expiresIn: '1h' }); // Replace 'secret' with your secret key
  }
}