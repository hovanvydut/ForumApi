import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { RoleModule } from './app/role/role.module';

@Module({
  imports: [UserModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
