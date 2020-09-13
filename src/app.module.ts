import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { MyConfigService } from './shared/service/my-config.service';
import { PermissionModule } from './app/permission/permission.module';
import { MethodModule } from './app/method/method.module';
import { ModuleModule } from './app/module/module.module';
import { AuthModule } from './app/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [MyConfigService],
      useFactory: (myConfigService: MyConfigService) =>
        myConfigService.getTypeOrmConfig(),
    }),
    UserModule,
    RoleModule,
    SharedModule,
    PermissionModule,
    MethodModule,
    ModuleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
