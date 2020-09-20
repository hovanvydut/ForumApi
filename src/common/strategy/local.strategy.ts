import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../app/auth/service/auth.service';
import { UserEntity } from 'src/app/user/entity/user.entity';

/***
 * Configure a strategy by providing two things:
 * - Pass the strategy options by calling the super() method in your subclass
 * - Verify callback by implementing a validate() method in your subclass.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Specify different property name instead default property
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Creating the user property on the Request object
    return user;
  }
}
