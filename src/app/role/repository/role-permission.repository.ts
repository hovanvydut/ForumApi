import { EntityRepository, Repository } from 'typeorm';
import { RolePermissionEntity } from '../entity/role-permission.entity';

@EntityRepository(RolePermissionEntity)
export class RolePermissionRepository extends Repository<
  RolePermissionEntity
> {}
