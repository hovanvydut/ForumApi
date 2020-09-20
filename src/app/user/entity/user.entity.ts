import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserGroupEntity } from './user-group.entity';
import { UserPermissionRoleEntity } from './user-permission-role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => UserGroupEntity,
    userGroup => userGroup.user,
    { cascade: true },
  )
  userGroups: UserGroupEntity[];

  @OneToMany(
    type => UserPermissionRoleEntity,
    userPermissionRole => userPermissionRole.user,
  )
  userPermissionRoles: UserPermissionRoleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
