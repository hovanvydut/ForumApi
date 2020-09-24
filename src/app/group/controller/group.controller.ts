import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateGroupDto } from 'src/common/dto/create-group.dto';
import { UpdateGroupInfoDto } from 'src/common/dto/update-group-info.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { GroupService } from '../service/group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  getAllGroups() {
    return this.groupService.getAllGroups();
  }

  // FIXME reload relation user, roles, permssion in one request
  @Get('/:groupId')
  getSpecificGroup(@Param('groupId') groupId: number) {
    return this.groupService.getSpecificGroup(groupId);
  }

  @Get('/:groupId/roles')
  getRolesOfGroup(@Param('groupId') groupId: number) {
    return this.groupService.getRolesOfGroup(groupId);
  }

  @Get('/:groupId/roles/:roleId')
  getSpecificRoleOfGroup(
    @Param('groupId') groupId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.groupService.getSpecificRoleOfGroup(groupId, roleId);
  }

  // FIXME ERROR
  @Get('/:groupId/permissions')
  getPermissionsOfGroup(@Param('groupId') groupId: number) {
    return this.groupService.getPermissionsOfGroup(groupId);
  }

  @Get('/:groupId/permissions/:permissionId')
  getSpecPermissionOfGroup(
    @Param('groupId') groupId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.groupService.getSpecPermissionOfGroup(groupId, permissionId);
  }

  // NOTE not finish
  @Get('/:groupId/users')
  getUsersOfGroup(@Param('groupId') groupId: number) {
    return this.groupService.getUsersOfGroup(groupId);
  }

  @Get('/:groupId/users/:userId')
  getSpecUserOfGroup(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ) {
    return this.groupService.getSpecUserOfGroup(groupId, userId);
  }

  @Post()
  createNewGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createNewGroup(createGroupDto);
  }

  @Put('/:groupId/users/:userId')
  assignUserOfGroup(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ) {
    return this.groupService.addUserToGroup(groupId, userId);
  }

  @Put('/:groupId/roles/:roleId')
  addRoleToGroup(@Param('groupId') groupId: number, @Param('roleId') roleId) {
    return this.groupService.addRoleToGroup(groupId, roleId);
  }

  // FIXME use isActiveList: IsActiveList instead
  @Put('/:groupId/permissions/:permissionId')
  addPermissionToGroup(
    @Param('groupId') groupId,
    @Param('permissionId') permissionId,
    @Body('is_active') is_active: number,
  ) {
    return this.groupService.addPermissionToGroup(
      groupId,
      permissionId,
      is_active,
    );
  }

  @Patch('/:groupId')
  updateGroupInfo(
    @Param('groupId') groupId: number,
    @Body() updateGroupInfoDto: UpdateGroupInfoDto,
  ) {
    return this.groupService.updateGroupInfo(groupId, updateGroupInfoDto);
  }

  // FIXME use isActiveList: IsActiveList instead
  @Patch('/:groupId/permissions/:permissionId')
  updatePermissionsOfGroup(
    @Param('groupId') groupId,
    @Param('permissionId') permissionId,
    @Body('is_active') is_active: number,
  ) {
    return this.groupService.updatePermissionsOfGroup(
      groupId,
      permissionId,
      is_active,
    );
  }

  @Delete('/:groupId')
  deleteGroupUserDefined() {}

  @Auth(PermissionList.delete_user_group)
  @Delete('/:groupId/users/:userId')
  removeUserFromGroup(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ) {
    return this.groupService.removeUserFromGroup(groupId, userId);
  }

  @Delete('/:groupId/permissions/:permissionId')
  removePermissionFromGroup() {}

  @Delete('/:groupId/roles/:roleId')
  removeRoleFromGroup(
    @Param('groupId') groupId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.groupService.removeRoleFromGroup(groupId, roleId);
  }
}
