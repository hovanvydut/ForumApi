import { CommentEntity } from 'src/app/comment/entity/comment.entity';
import { IdeaEntity } from 'src/app/idea/entity/idea.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { GroupUserEntity } from '../../group/entity/group-user.entity';
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
    type => CommentEntity,
    comments => comments.owner,
  )
  comments: CommentEntity;

  @OneToMany(
    type => GroupUserEntity,
    userGroup => userGroup.user,
  )
  groupUsers: GroupUserEntity[];

  @OneToMany(
    type => UserPermissionEntity,
    userPermissions => userPermissions.user,
  )
  userPermissions: UserPermissionEntity[];

  @OneToMany(
    type => IdeaEntity,
    ideas => ideas.author,
  )
  idea: IdeaEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
