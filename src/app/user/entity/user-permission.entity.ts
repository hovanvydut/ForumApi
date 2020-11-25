import { PermissionEntity } from '../../permission/entity/permission.entity';
import { RoleEntity } from '../../role/entity/role.entity';
import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Check(
    '(role_id is NULL AND permission_id is NOT NULL) OR (role_id is NOT NULL AND permission_id is NULL)',
)
@Entity({ name: 'user_permissions' })
export class UserPermissionEntity {
    @PrimaryGeneratedColumn()
    user_permission_id: number;

    @ManyToOne(
        type => UserEntity,
        user => user.userPermissions,
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
    is_active: number;
}
