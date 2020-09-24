import { UserEntity } from 'src/app/user/entity/user.entity';
import { isPublishedConstant } from 'src/common/enums/is-published.enum';
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

@Entity({ name: 'ideas' })
export class IdeaEntity {
  @PrimaryGeneratedColumn()
  idea_id: number;

  @Column()
  idea_name: string;

  @Column({ unique: true })
  idea_slug: string;

  @ManyToOne(
    type => UserEntity,
    author => author.ideas,
    { eager: true },
  )
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column()
  idea_description: string;

  @Column()
  idea_content: string;

  @Column({ default: isPublishedConstant.NO })
  is_published: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
