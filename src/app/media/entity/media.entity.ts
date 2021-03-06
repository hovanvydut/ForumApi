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

@Entity({ name: 'media' })
export class MediaEntity {
  @PrimaryGeneratedColumn()
  media_id: number;

  @Column()
  media_type: string;

  @Column()
  media_src: string;

  @Column({ nullable: true })
  media_description: string;

  @ManyToOne(
    type => IdeaEntity,
    idea => idea.media,
  )
  @JoinColumn({ name: 'idea_id' })
  idea: IdeaEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
