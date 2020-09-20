import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptUtil } from 'src/shared/bcrypt.util';
import { UserEntity } from 'src/app/user/entity/user.entity';
import { IPayloadToken } from 'src/common/interfaces/payload-token.interface';

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
    if (user && this.bcryptUtil.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generate JWT from a subset of the user object properties
   */
  async login(reqUser: IReqUser): Promise<IAuthToken> {
    const payload: IPayloadToken = {
      sub: reqUser.user_id,
      email: reqUser.email,
      fullname: reqUser.fullname,
    };

    // return token to client
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
