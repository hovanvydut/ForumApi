import { GroupEntity } from './group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'group_users' })
export class GroupUserEntity {
  @PrimaryGeneratedColumn()
  group_user_id: number;

  // FIXME why cascade: true is not working
  @ManyToOne(
    type => UserEntity,
    user => user.groupUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    type => GroupEntity,
    group => group.groupUsers,
  )
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;
}
