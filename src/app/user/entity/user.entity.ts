import { BcryptUtil } from 'src/shared/bcrypt.util';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UserGroupEntity } from './user-group.entity';
import { UserPermissionRoleEntity } from './user-permission-role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const bcryptUtil = BcryptUtil.getInstance();
    this.password = bcryptUtil.generateHash(this.password);
  }
}
