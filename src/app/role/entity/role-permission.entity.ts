import { PermissionEntity } from './../../permission/entity/permission.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Check(
  '(role_id IS NULL AND permission_id IS NULL) OR (role_id IS NOT NULL AND permission_id IS NOT NULL)',
)
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
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @Column({ default: 0 })
  is_active: number;
}
