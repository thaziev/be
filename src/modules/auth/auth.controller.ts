import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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

  @Get('register')
  redirectRegister(@Res() res: Response) {
    res.status(302).redirect('/register');
  }
}