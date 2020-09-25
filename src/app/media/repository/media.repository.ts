import { EntityRepository, Repository } from 'typeorm';
import { MediaEntity } from '../entity/media.entity';

@EntityRepository(MediaEntity)
export class MediaRepository extends Repository<MediaEntity> {}
