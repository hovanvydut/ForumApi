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
import { CreateGroupDto } from 'src/common/dto/create-group.dto';
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
    // return this.groupService.addRoleToGroup(groupId, roleId);
  }

  // FIXME use isActiveList: IsActiveList instead
  @Put('/:groupId/permissions/:permisisonId')
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
  updateGroupInfo() {}

  @Patch('/:groupId/roles')
  updateRolesOfGroup() {}

  @Patch('/:groupId/permissions')
  updatePermissionsOfGroup() {}

  @Delete('/:groupId')
  deleteGroupUserDefined() {}

  @Delete('/:groupId/users/:userId')
  removeUserFromGroup() {}

  @Delete('/:groupId/permissions/:permissionId')
  removePermissionFromGroup() {}

  @Delete('/:groupId/roles/:roleId')
  removeRoleFromGroup() {}
}
