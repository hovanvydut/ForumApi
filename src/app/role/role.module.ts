import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';
import { RolePermissionRepository } from './repository/role-permission.repository';

const repositories = [RoleRepository, RolePermissionRepository];
@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
