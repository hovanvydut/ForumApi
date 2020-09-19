import { PermissionEntity } from './../../permission/entity/permission.entity';
import { RoleEntity } from './../../role/entity/role.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';

@Entity({ name: 'group_roles' })
export class GroupRoleEntity {
    @PrimaryGeneratedColumn()
    group_role_id: number;

    @ManyToOne(
        type => GroupEntity,
        group => group.groupRoles,
    )
    @JoinColumn({ name: 'group_id' })
    group: GroupEntity;

    @ManyToOne(
        type => RoleEntity,
        group => group.groupRoles,
    )
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @ManyToOne(
        type => PermissionEntity,
        permission => permission.groupRoles,
        // { nullable: true },
    )
    @JoinColumn({ name: 'permission_id' })
    permission: PermissionEntity;

    @Column({ default: 0 })
    autho_setting: number;
}
