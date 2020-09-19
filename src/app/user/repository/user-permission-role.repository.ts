import { EntityRepository, Repository } from 'typeorm';
import { UserPermissionRoleEntity } from '../entity/user-permission-role.entity';

@EntityRepository(UserPermissionRoleEntity)
export class UserPermissionRoleRepository extends Repository<
    UserPermissionRoleEntity
> {}
