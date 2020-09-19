import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptUtil } from 'src/shared/bcrypt.util';

@Injectable()
export class AuthService {
  private readonly bcryptUtil: BcryptUtil;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.bcryptUtil = BcryptUtil.getInstance();
  }

  /**
   * verify user if (email, password) exist in DB
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    console.log(this.bcryptUtil.generateHash('123123'));
    if (user && this.bcryptUtil.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generate JWT from a subset of the user object properties
   */
  async login(user: any): Promise<IAuthToken> {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
