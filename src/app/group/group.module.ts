import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { GroupRoleRepository } from './repository/group-role.repository';
import { GroupUserRepository } from './repository/group-user.repository';
import { PermissionModule } from '../permission/permission.module';

const repositories = [
  GroupRepository,
  GroupRoleRepository,
  GroupUserRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), PermissionModule],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
