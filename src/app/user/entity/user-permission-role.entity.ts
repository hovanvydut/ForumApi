import { PermissionEntity } from './../../permission/entity/permission.entity';
import { RoleEntity } from './../../role/entity/role.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_permission_roles' })
export class UserPermissionRoleEntity {
    @PrimaryGeneratedColumn()
    user_permission_role_id: number;

    @ManyToOne(
        type => UserEntity,
        user => user.userPermissionRoles,
    )
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(
        type => RoleEntity,
        role => role.userPermissionRoles,
    )
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @ManyToOne(
        type => PermissionEntity,
        permission => permission.userPermissionRoles,
    )
    @JoinColumn({ name: 'permission_id' })
    permission: PermissionEntity;

    @Column({ default: 0 })
    autho_setting: number;
}
