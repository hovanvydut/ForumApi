import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupRepository } from './repository/user-group.repository';
import { UserPermissionRoleRepository } from './repository/user-permission-role.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RoleModule } from '../role/role.module';
import { UserGroupService } from './service/user-group.service';
import { GroupModule } from '../group/group.module';

const repositories = [
  UserRepository,
  UserGroupRepository,
  UserPermissionRoleRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), RoleModule, GroupModule],
  providers: [UserService, UserGroupService],
  exports: [UserService, UserGroupService],
  controllers: [UserController],
})
export class UserModule {}
