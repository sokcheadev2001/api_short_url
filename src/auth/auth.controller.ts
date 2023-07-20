import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request as RequestDecorator,
  Res,
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
  async register(
    @Res() response: Response,
    @Req() request: Request,
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(response, request.ip, registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    return this.authService.signIn(response, signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@RequestDecorator() req) {
    return this.authService.Profile(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refresh(@Req() request: Request) {
    return this.authService.refreshToken(request);
  }
}
