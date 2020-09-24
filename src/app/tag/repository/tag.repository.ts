import { EntityRepository, Repository } from 'typeorm';
import { TagEntity } from '../entity/tag.entity';

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {}
