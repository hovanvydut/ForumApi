import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { MyConfigService } from 'src/shared/service/my-config.service';

/***
 * Configure a strategy by providing two things:
 * - Pass the strategy options by calling the super() method in your subclass
 * - Verify callback by implementing a validate() method in your subclass.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly myConfigService: MyConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: myConfigService.getJwtConfig().secret,
    });
  }

  /***
   * 1. verifies the JWT's signature and decodes the JSON
   * 2. invokes validate() method passing the decoded JSON as its single parameter
   * Based on the way JWT signing works, we're guaranteed that we're receiving a valid token that we have previously signed and issued to a valid user.
   */
  async validate(payload: any): Promise<IReqUser> {
    const { sub, email, name } = payload;

    // Creating the user property on the Request object
    return { id: sub, email, name };
  }
}
