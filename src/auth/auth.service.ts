import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServices: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    // Find the user with this email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare the received password with the stored password
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (match) {
      const payload = { id: user.id, email: user.email };
      const accessToken = await this.jwtServices.signAsync(payload);
      return {
        user: { ...user, accessToken },
      };
    }
    throw new UnauthorizedException();
  }
}
