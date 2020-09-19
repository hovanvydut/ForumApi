import { GroupRoleEntity } from './../../group/entity/group-role.entity';
import { UserPermissionRoleEntity } from './../../user/entity/user-permission-role.entity';
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
        type => UserPermissionRoleEntity,
        userPermissionRole => userPermissionRole.role,
    )
    userPermissionRoles: UserPermissionRoleEntity[];

    @OneToMany(
        type => RolePermissionEntity,
        rolePermissions => rolePermissions.role,
    )
    rolePermissions: RolePermissionEntity[];
}
