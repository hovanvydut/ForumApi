import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { GroupRoleRepository } from './repository/group-role.repository';
import { UserModule } from '../user/user.module';

const repositories = [GroupRepository, GroupRoleRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    forwardRef(() => UserModule),
  ],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
