import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
