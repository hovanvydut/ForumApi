import { GroupEntity } from './../../group/entity/group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_groups' })
export class UserGroupEntity {
  @PrimaryGeneratedColumn()
  user_group_id: number;

  // FIXME why cascade: true is not working
  @ManyToOne(
    type => UserEntity,
    user => user.userGroups,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    type => GroupEntity,
    group => group.userGroups,
  )
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;
}
