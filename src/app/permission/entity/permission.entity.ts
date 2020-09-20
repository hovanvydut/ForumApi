import { GroupRoleEntity } from './../../group/entity/group-role.entity';
import { RolePermissionEntity } from './../../role/entity/role-permission.entity';
import { UserPermissionEntity } from '../../user/entity/user-permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column()
  permission_code: string;

  @Column()
  permission_description: string;

  @OneToMany(
    type => RolePermissionEntity,
    rolePermission => rolePermission.permission,
  )
  rolePermissions: RolePermissionEntity[];

  @OneToMany(
    type => UserPermissionEntity,
    userPermissionRole => userPermissionRole.permission,
  )
  userPermissionRoles: UserPermissionEntity[];

  @OneToMany(
    type => GroupRoleEntity,
    groupRole => groupRole.permission,
  )
  groupRoles: GroupRoleEntity[];
}
