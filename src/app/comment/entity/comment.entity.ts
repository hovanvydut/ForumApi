import { IdeaEntity } from 'src/app/idea/entity/idea.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  comment_content: string;

  @ManyToOne(
    type => IdeaEntity,
    idea => idea.comments,
  )
  @JoinColumn({ name: 'idea_id' })
  idea: IdeaEntity;

  @ManyToOne(type => CommentEntity)
  @JoinColumn({ name: 'reply_comment_id' })
  reply_comment: CommentEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
