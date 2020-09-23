import { GroupUserEntity } from './group-user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupRoleEntity } from './group-role.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  group_id: number;

  @Column()
  group_name: string;

  @Column({ unique: true })
  group_code: string;

  @Column()
  group_description: string;

  @OneToMany(
    type => GroupUserEntity,
    userGroup => userGroup.group,
  )
  groupUsers: GroupUserEntity[];

  @OneToMany(
    type => GroupRoleEntity,
    groupRole => groupRole.group,
  )
  groupRoles: GroupRoleEntity[];
}
