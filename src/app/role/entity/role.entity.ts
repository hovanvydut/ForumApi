import { GroupRoleEntity } from './../../group/entity/group-role.entity';
import { UserPermissionEntity } from '../../user/entity/user-permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermissionEntity } from './role-permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @Column()
  role_code: string;

  @Column()
  role_description: string;

  @OneToMany(
    type => GroupRoleEntity,
    groupRole => groupRole.role,
  )
  groupRoles: GroupRoleEntity[];

  @OneToMany(
    type => UserPermissionEntity,
    userPermissionRole => userPermissionRole.role,
  )
  userPermissionRoles: UserPermissionEntity[];

  @OneToMany(
    type => RolePermissionEntity,
    rolePermissions => rolePermissions.role,
  )
  rolePermissions: RolePermissionEntity[];
}
