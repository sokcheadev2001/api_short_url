import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServices: JwtService,
  ) {}

  async register(response, ip, registerDto: RegisterDto) {
    const user = await this.usersService.create(ip, registerDto);
    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtServices.signAsync(payload);
    const refreshToken = await this.jwtServices.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const { password, ...result } = user;
    return {
      user: { ...result, accessToken },
    };
  }

  async signIn(response, signInDto: SignInDto) {
    // Find the user with this email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare the received password with the stored password
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (match) {
      const payload = { id: user.id, email: user.email };
      const accessToken = await this.jwtServices.signAsync(payload);

      const refreshToken = await this.jwtServices.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const { password, ...result } = user;
      return {
        user: { ...result, accessToken },
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
  }
}
