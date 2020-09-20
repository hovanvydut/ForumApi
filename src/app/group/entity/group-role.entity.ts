import { PermissionEntity } from './../../permission/entity/permission.entity';
import { RoleEntity } from './../../role/entity/role.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';

@Check(
  '(role_id is NULL AND permission_id is NOT NULL) OR (role_id is NOT NULL AND permission_id is NULL)',
)
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
  is_active: number;
}
