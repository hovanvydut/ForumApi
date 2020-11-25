import { EntityRepository, Repository } from 'typeorm';
import { UserPermissionEntity } from '../entity/user-permission.entity';

@EntityRepository(UserPermissionEntity)
export class UserPermissionRepository extends Repository<
    UserPermissionEntity
> {}
