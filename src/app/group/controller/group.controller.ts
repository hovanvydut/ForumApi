import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/:groupId/users')
  getUsersOfGroup(@Param('groupId') groupId: number) {
    return this.groupService.getUsersOfGroup(groupId);
  }

  @Get('/:groupId/users/:userId')
  getSpecUserOfGroup() {}

  @Post()
  createNewGroup() {}

  @Put('/:groupId/users/:userId')
  addUserToGroup() {}

  @Put('/:groupId/roles/:roleId')
  addRoleToGroup() {}

  @Put('/:groupId/permissions/:permisisonId')
  addPermissionToGroup() {}

  @Patch('/:groupId')
  updateGroup() {}

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
