import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './repository/group.repository';
import { GroupService } from './service/group.service';

const repositories = [GroupRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
