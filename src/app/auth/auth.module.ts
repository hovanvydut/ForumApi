import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategy/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MyConfigService } from 'src/shared/service/my-config.service';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    SharedModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [MyConfigService],
      useFactory: (myConigService: MyConfigService) =>
        myConigService.getJwtConfig(),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
