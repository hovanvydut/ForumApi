import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/service/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * verify user if (email, password) exist in DB
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && this.bcryptService.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generate JWT from a subset of the user object properties
   */
  async login(user: any): Promise<IToken> {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
