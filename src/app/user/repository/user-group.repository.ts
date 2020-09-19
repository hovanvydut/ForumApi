import { EntityRepository, Repository } from 'typeorm';
import { UserGroupEntity } from '../entity/user-group.entity';

@EntityRepository(UserGroupEntity)
export class UserGroupRepository extends Repository<UserGroupEntity> {}
