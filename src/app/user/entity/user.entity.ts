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
import { UserPermissionEntity } from './user-permission.entity';

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
  )
  userGroups: UserGroupEntity[];

  @OneToMany(
    type => UserPermissionEntity,
    userPermissions => userPermissions.user,
  )
  userPermissions: UserPermissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
