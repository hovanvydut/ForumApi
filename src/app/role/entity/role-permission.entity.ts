import { PermissionEntity } from './../../permission/entity/permission.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'role_permissions' })
export class RolePermissionEntity {
    @PrimaryGeneratedColumn()
    role_permission_id: number;

    @ManyToOne(
        type => PermissionEntity,
        permission => permission.rolePermissions,
    )
    @JoinColumn({ name: 'permission_id' })
    permission: PermissionEntity;

    @ManyToOne(
        type => RoleEntity,
        role => role.rolePermissions,
    )
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @Column({ default: 0 })
    autho_setting: number;
}
