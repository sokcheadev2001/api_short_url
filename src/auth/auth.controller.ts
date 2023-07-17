import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Req() request: Request, @Body() registerDto: RegisterDto) {
    return this.authService.register(request.ip, registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
