import { EntityRepository, Repository } from 'typeorm';
import { GroupUserEntity } from '../entity/group-user.entity';

@EntityRepository(GroupUserEntity)
export class GroupUserRepository extends Repository<GroupUserEntity> {}
