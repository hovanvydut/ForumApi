import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { Config } from 'src/config/configuration';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(Config.getInstance().getJwtConfig()),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
