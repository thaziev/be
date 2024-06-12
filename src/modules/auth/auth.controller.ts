import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ... other methods ...

  @Get('register')
  @HttpCode(HttpStatus.OK)
  async registerRedirect(): Promise<any> {
    return this.authService.handleRegisterLinkRedirection();
  }
}