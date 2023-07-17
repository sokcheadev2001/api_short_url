import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto) {
    // Find the user with this email
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare the received password with the stored password
    const match = await bcrypt.compare(signInDto.password, user.password);
    if (match) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
