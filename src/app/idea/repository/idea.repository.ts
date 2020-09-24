import { EntityRepository, Repository } from 'typeorm';
import { IdeaEntity } from '../entity/idea.entity';

@EntityRepository(IdeaEntity)
export class IdeaRepository extends Repository<IdeaEntity> {}
