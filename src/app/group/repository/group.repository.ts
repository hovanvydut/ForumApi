import { EntityRepository, Repository } from 'typeorm';
import { GroupEntity } from '../entity/group.entity';

@EntityRepository(GroupEntity)
export class GroupRepository extends Repository<GroupEntity> {}
