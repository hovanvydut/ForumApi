import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getAllPermissions(userId: number): Promise<IReturnedPermission[]> {
    const raw1 = await this.createQueryBuilder('user')
      .select('permissions.permission_code AS permission_code_1')
      .addSelect('permissions_2.permission_code AS permission_code_2')
      .addSelect('role_permissions.is_active AS is_active_1')
      .addSelect('user_permissions.is_active AS is_active_2')
      .leftJoin('user.userPermissions', 'user_permissions')
      .leftJoin(
        'permissions',
        'permissions_2',
        'user_permissions.permission_id = permissions_2.permission_id',
      )
      .leftJoin('user_permissions.role', 'roles')
      .leftJoin('roles.rolePermissions', 'role_permissions')
      .leftJoin('role_permissions.permission', 'permissions')
      .where('user.user_id = :userId', { userId })
      .getRawMany();
    const raw2 = await this.createQueryBuilder('user')
      .select('permissions.permission_code AS permission_code_1')
      .addSelect('permissions_2.permission_code AS permission_code_2')
      .addSelect('role_permissions.is_active AS is_active_1')
      .addSelect('group_roles.is_active AS is_active_2')
      .leftJoin('user.userGroups', 'user_groups')
      .leftJoin('user_groups.group', 'groups')
      .leftJoin('groups.groupRoles', 'group_roles')
      .leftJoin('group_roles.role', 'roles')
      .leftJoin(
        'permissions',
        'permissions_2', // alias of permission table
        'group_roles.permission_id = permissions_2.permission_id',
      )
      .leftJoin('roles.rolePermissions', 'role_permissions')
      .leftJoin('role_permissions.permission', 'permissions')
      .where('user.user_id = :userId', { userId })
      .getRawMany();
    return [...raw1, ...raw2];
  }
}

interface IReturnedPermission {
  permission_code_1: string;
  is_active_1: number;
  permission_code_2?: string;
  is_active_2?: number;
}

// .leftJoin(
//   'role_permissions.permission',
//   'permissions',
//   'role_permissions.is_active = :YES',
//   { YES: isActiveList.YES },
// )
