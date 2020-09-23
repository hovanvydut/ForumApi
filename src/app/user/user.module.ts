import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionRepository } from './repository/user-permission.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RoleModule } from '../role/role.module';
import { GroupModule } from '../group/group.module';

const repositories = [UserRepository, UserPermissionRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), RoleModule, GroupModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
