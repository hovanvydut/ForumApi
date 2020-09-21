import { EntityRepository, Repository } from 'typeorm';
import { GroupRoleEntity } from '../entity/group-role.entity';

@EntityRepository(GroupRoleEntity)
export class GroupRoleRepository extends Repository<GroupRoleEntity> {}
