import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServices: JwtService,
  ) {}

  async register(response: Response, ip: string, registerDto: RegisterDto) {
    const user = await this.usersService.create(ip, registerDto);
    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtServices.signAsync(payload);
    const refreshToken = await this.jwtServices.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: '1d',
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return {
      accessToken,
    };
  }

  async signIn(response: Response, signInDto: SignInDto) {
    // Find the user with this email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare the received password with the stored password
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (match) {
      const payload = { id: user.id, email: user.email };
      const accessToken = await this.jwtServices.signAsync(payload);

      const refreshToken = await this.jwtServices.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: '1d',
      });

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return {
        accessToken,
      };
    }
    throw new UnauthorizedException();
  }

  async Profile(id: number) {
    const user = await this.usersService.findOne(id);
    const { password, ...result } = user;
    return result;
  }

  async refreshToken(req: Request) {
    try {
      if (!req.cookies?.refreshToken) {
        throw new UnauthorizedException();
      }
      const refreshToken = req.cookies.refreshToken;
      const payload = await this.jwtServices.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });
      const id = payload.id;
      const email = payload.email;

      const accessToken = await this.jwtServices.signAsync({ id, email });
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired');
    }
  }
}
