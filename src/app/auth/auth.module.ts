import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { Config } from 'src/config/configuration';
import { AuthPermissionGuard } from './guards/permission-auth.guard';
import { UserService } from '../user/service/user.service';

@Module({
  imports: [
    // forwardRef(() => UserModule),
    UserModule,
    PassportModule,
    JwtModule.register(Config.getInstance().getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [UserModule],
})
export class AuthModule {}
