import { CommentEntity } from 'src/app/comment/entity/comment.entity';
import { MediaEntity } from 'src/app/media/entity/media.entity';
import { UserEntity } from 'src/app/user/entity/user.entity';
import { isPublishedConstant } from 'src/common/enums/is-published.enum';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'idea' })
export class IdeaEntity {
    @PrimaryGeneratedColumn()
    idea_id: number;

    @Column()
    idea_name: string;

    @Column({ unique: true })
    idea_slug: string;

    @ManyToOne(
        type => UserEntity,
        author => author.idea,
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

    @OneToMany(
        type => MediaEntity,
        media => media.idea,
    )
    media: MediaEntity[];

    @OneToMany(
        type => CommentEntity,
        comments => comments.idea,
    )
    comments: CommentEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
