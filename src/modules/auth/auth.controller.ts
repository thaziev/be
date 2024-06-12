import { Controller, Get, HttpCode, HttpStatus, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ... other methods ...

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const { token, userId, message } = await this.authService.authenticateUser(loginDto.email, loginDto.password);
      return {
        status: HttpStatus.OK,
        session_token: token,
        user_id: userId,
        message: message,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.response);
      }
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Get('register')
  @HttpCode(HttpStatus.OK)
  async registerRedirect(): Promise<any> {
    return this.authService.handleRegisterLinkRedirection();
  }
}