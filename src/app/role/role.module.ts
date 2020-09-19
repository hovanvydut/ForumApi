import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './service/role.service';

const repositories = [RoleRepository];
@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
