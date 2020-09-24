import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PermissionService } from 'src/app/permission/service/permission.service';
import { UserEntity } from 'src/app/user/entity/user.entity';
import { CreateGroupDto } from 'src/common/dto/create-group.dto';
import { UpdateGroupInfoDto } from 'src/common/dto/update-group-info.dto';
import {
  GroupErrorMsg,
  PermissionErrorMsg,
} from 'src/common/enums/error-message.enum';
import { FindConditions } from 'typeorm';
import { GroupRoleEntity } from '../entity/group-role.entity';
import { GroupUserEntity } from '../entity/group-user.entity';
import { GroupEntity } from '../entity/group.entity';
import { GroupRoleRepository } from '../repository/group-role.repository';
import { GroupUserRepository } from '../repository/group-user.repository';
import { GroupRepository } from '../repository/group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly groupRoleRepo: GroupRoleRepository,
    private readonly groupUserRepo: GroupUserRepository,
    private readonly permissionService: PermissionService,
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
      { relations: ['groupUsers', 'groupRoles'] },
    );
  }

  getRolesOfGroup(groupId: number) {
    return this.groupRepo
      .createQueryBuilder('groups')
      .select(['roles.*'])
      .innerJoin('groups.groupRoles', 'group_roles')
      .innerJoin('group_roles.role', 'roles')
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

  async getPermissionsOfGroup(groupId: number) {
    const raw = await this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .select([
        'groups.group_id AS group_id',
        'permissions.*',
        'group_roles.is_active AS is_active',
        'permissions_2.*',
      ])
      .innerJoin('group_roles.group', 'groups')
      .leftJoin('group_roles.permission', 'permissions')
      .leftJoin('group_roles.role', 'roles')
      .leftJoin('roles.rolePermissions', 'role_permissions')
      .leftJoin(
        'permissions',
        'permissions_2',
        'permissions_2.permission_id = role_permissions.permission_id',
      )
      .where('group_roles.group_id = :groupId', { groupId })
      .execute();
    return raw;
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
      .innerJoin('groups.groupUsers', 'group_users')
      .innerJoin('group_users.user', 'users')
      .where('groups.group_id = :groupId', { groupId })
      .execute();
  }

  getSpecUserOfGroup(groupId: number, userId: number) {
    return this.groupRepo
      .createQueryBuilder('groups')
      .select(['users.*'])
      .innerJoin('groups.groupUsers', 'group_users')
      .innerJoin('group_users.user', 'users')
      .where('groups.group_id = :groupId AND users.user_id = :userId', {
        groupId,
        userId,
      })
      .execute();
  }

  createNewGroup(createGroupDto: CreateGroupDto) {
    return this.groupRepo.insert(createGroupDto);
  }

  // FIXME error when write-> groupId:number, userId: number
  async addUserToGroup(groupId, userId) {
    const raw = await this.getSpecUserOfGroup(groupId, userId);
    if (raw.length == 0) throw new ConflictException();
    return this.groupUserRepo.insert({ user: userId, group: groupId });
  }

  async assignUserOfGroup(
    userEntity: UserEntity,
    credentials: FindConditions<GroupEntity>,
  ) {
    const groupEntity = await this.findOne(credentials);
    if (!groupEntity)
      throw new NotFoundException({ message: GroupErrorMsg.GROUP_NOT_FOUND });

    return this.groupUserRepo.insert({ group: groupEntity, user: userEntity });
  }
  // FIXME error when write-> groupId:number, roleId: number
  async addRoleToGroup(groupId, roleId) {
    return this.groupRoleRepo.insert({ group: groupId, role: roleId });
  }

  async addPermissionToGroup(
    groupId: number,
    permissionId: number,
    is_active: number,
  ) {
    const group = await this.findOne({ group_id: groupId });
    const permission = await this.permissionService.findOne({
      permission_id: permissionId,
    });

    if (!group)
      throw new ConflictException({ message: GroupErrorMsg.GROUP_NOT_FOUND });
    if (!permission)
      throw new ConflictException({
        message: PermissionErrorMsg.PERMISSION_NOT_FOUND,
      });
    return this.groupRoleRepo.insert({ group, permission, is_active });
  }

  updateGroupInfo(groupId: number, updateGroupInfoDto: UpdateGroupInfoDto) {
    return this.groupRepo.update({ group_id: groupId }, updateGroupInfoDto);
  }

  updatePermissionsOfGroup(
    groupId: number,
    permissionId: number,
    is_active: number,
  ) {
    return this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .update(GroupRoleEntity)
      .set({ is_active })
      .where('group_id = :groupId AND permission_id = :permissionId', {
        groupId,
        permissionId,
      })
      .execute();
  }

  removeRoleFromGroup(groupId: number, roleId: number) {
    return this.groupRoleRepo
      .createQueryBuilder('group_roles')
      .delete()
      .from(GroupRoleEntity)
      .where('group_id = :groupId AND role_id = :roleId', { groupId, roleId })
      .returning('*')
      .execute();
  }

  removeUserFromGroup(groupId: number, userId: number) {
    return this.groupUserRepo
      .createQueryBuilder()
      .delete()
      .from(GroupUserEntity)
      .where('group_id = :groupId AND user_id = :userId', { groupId, userId })
      .execute();
  }
}
