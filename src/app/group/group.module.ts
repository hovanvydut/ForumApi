import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { GroupRoleRepository } from './repository/group-role.repository';

const repositories = [GroupRepository, GroupRoleRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
