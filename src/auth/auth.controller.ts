import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request as RequestDecorator,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { AuthGuard } from './guard/auth.guard';
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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@RequestDecorator() req) {
    return this.authService.Profile(req.user.id);
  }
}
