import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from 'src/common/dto/create-group.dto';
import { FindConditions } from 'typeorm';
import { GroupEntity } from '../entity/group.entity';
import { GroupRoleRepository } from '../repository/group-role.repository';
import { GroupRepository } from '../repository/group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly groupRoleRepo: GroupRoleRepository,
  ) {}

  findOne(conditions: FindConditions<GroupEntity>) {
    return this.groupRepo.findOne(conditions);
  }

  getAllGroups() {
    return this.groupRepo.find();
  }

  getSpecificGroup(groupId: number) {
    return this.groupRepo.findOne(
      { group_id: groupId },
      { relations: ['userGroups', 'groupRoles'] },
    );
  }

  getRolesOfGroup(groupId: number) {
    return this.groupRepo
      .createQueryBuilder('groups')
      .select(['roles.*'])
      .leftJoin('groups.groupRoles', 'group_roles')
      .leftJoin('group_roles.role', 'roles')
      .where('groups.group_id = :groupId', { groupId })
      .execute();
  }

  getSpecificRoleOfGroup(groupId: number, roleId: number) {
    return this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .select([
        'groups.group_id AS group_id',
        'roles.*',
        'permissions.*',
        'group_roles.is_active AS is_active',
      ])
      .leftJoin('group_roles.role', 'roles')
      .innerJoin('group_roles.group', 'groups')
      .leftJoin('group_roles.permission', 'permissions')
      .where(
        'group_roles.role_id = :roleId AND group_roles.group_id = :groupId',
        { roleId, groupId },
      )
      .execute();
  }

  getPermissionsOfGroup(groupId: number) {
    return this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .select([
        'groups.group_id AS group_id',
        'permissions.*',
        'group_roles.is_active AS is_active',
      ])
      .innerJoin('group_roles.group', 'groups')
      .leftJoin('group_roles.permission', 'permissions')
      .where('group_roles.group_id = :groupId', { groupId })
      .execute();
  }

  getSpecPermissionOfGroup(groupId: number, permissionId: number) {
    return this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .select([
        'groups.group_id AS group_id',
        'permissions.*',
        'group_roles.is_active AS is_active',
      ])
      .innerJoin('group_roles.group', 'groups')
      .leftJoin('group_roles.permission', 'permissions')
      .where(
        'group_roles.group_id = :groupId AND permissions.permission_id = :permissionId',
        { groupId, permissionId },
      )
      .execute();
  }

  getUsersOfGroup(groupId: number) {
    return this.groupRepo
      .createQueryBuilder('groups')
      .select(['users.*'])
      .innerJoin('groups.userGroups', 'user_groups')
      .innerJoin('user_groups.user', 'users')
      .where('groups.group_id = :groupId', { groupId })
      .execute();
  }

  getSpecUserOfGroup(groupId: number, userId: number) {
    return this.groupRepo
      .createQueryBuilder('groups')
      .select(['users.*'])
      .innerJoin('groups.userGroups', 'user_groups')
      .innerJoin('user_groups.user', 'users')
      .where('groups.group_id = :groupId AND users.user_id = :userId', {
        groupId,
        userId,
      })
      .execute();
  }

  createNewGroup(createGroupDto: CreateGroupDto) {
    return this.groupRepo.insert(createGroupDto);
  }

  addUserToGroup(groupId, userId) {}
}
