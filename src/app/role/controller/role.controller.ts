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
import { CreateNewRoleDto } from 'src/common/dto/create-new-role.dto';
import { IsActiveDto } from 'src/common/dto/is-active.dto';
import { UpdateRoleInfoDto } from 'src/common/dto/update-role-info.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleService } from '../service/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.getAllRoles();
  }

  @Get('/:roleId')
  getSpecRole(@Param('roleId') roleId: number): Promise<RoleEntity> {
    return this.roleService.findOne({ role_id: roleId });
  }

  @Get('/:roleId/permissions')
  getPermissionsOfRole(@Param('roleId') roleId: number) {
    return this.roleService.getPermissionsOfRole(roleId);
  }

  @Get('/:roleId/permissions/:permissionId')
  getSpecificPermmissionOfRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.roleService.getSpecificPermmissionOfRole(roleId, permissionId);
  }

  @Post()
  createNewRole(@Body() createNewRoleDto: CreateNewRoleDto) {
    return this.roleService.createNewRole(createNewRoleDto);
  }

  @Put('/:roleId/permissions/:permissionId')
  addPermissionToRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.roleService.addPermissionToRole(roleId, permissionId);
  }

  @Patch('/:roleId')
  updateRoleInfo(
    @Param('roleId') roleId: number,
    @Body() updateRoleInfoDto: UpdateRoleInfoDto,
  ) {
    return this.roleService.updateRoleInfo(roleId, updateRoleInfoDto);
  }

  // FIXME Update is_active error
  @Patch('/:roleId/permissions/:permissionId')
  updateIsActivePermissionsOfRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
    @Body() isActiveDto: IsActiveDto,
  ) {
    console.log(isActiveDto);
    return this.roleService.updateIsActivePermissionsOfRole(
      roleId,
      permissionId,
      isActiveDto.is_active,
    );
  }

  @Delete('/:roleId/permissions/:permissionId')
  removePermissionFromRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.roleService.removePermissionFromRole(roleId, permissionId);
  }

  @Delete('/:roleId')
  deleteRoleUserDefined(@Param('roleId') roleId: number) {
    return this.roleService.deleteRoleUserDefined(roleId);
  }
}
