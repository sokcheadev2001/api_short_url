import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request as RequestDecorator,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/signIn.dto';
import { RegisterDto } from '../dto/register.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Body() registerDto: RegisterDto,
  ) {
    return this.auth.register(response, request.ip, registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    return this.auth.signIn(response, signInDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@RequestDecorator() req) {
    return this.auth.Profile(req.user.id);
  }

  // @UseGuards(AuthGuard)
  @Post('refresh')
  refresh(@Req() request: Request) {
    return this.auth.refreshToken(request);
  }
}
