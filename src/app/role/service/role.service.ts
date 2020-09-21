import { Injectable } from '@nestjs/common';
import { PermissionEntity } from 'src/app/permission/entity/permission.entity';
import { CreateNewRoleDto } from 'src/common/dto/create-new-role.dto';
import { IsActiveDto } from 'src/common/dto/is-active.dto';
import { UpdateRoleInfoDto } from 'src/common/dto/update-role-info.dto';
import { FindConditions } from 'typeorm';
import { RoleEntity } from '../entity/role.entity';
import { RolePermissionRepository } from '../repository/role-permission.repository';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly rolePermissionRepo: RolePermissionRepository,
  ) {}

  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepo.find();
  }

  findOne(conditions: FindConditions<RoleEntity>): Promise<RoleEntity> {
    return this.roleRepo.findOne(conditions);
  }

  getPermissionsOfRole(roleId: number) {
    return this.roleRepo
      .createQueryBuilder('roles')
      .select(['roles.role_id AS role_id', 'roles.role_name as role_name'])
      .addSelect('permissions.*')
      .addSelect('role_permissions.is_active AS is_active')
      .innerJoin('roles.rolePermissions', 'role_permissions')
      .innerJoin('role_permissions.permission', 'permissions')
      .where('roles.role_id = :roleId', { roleId })
      .execute();
  }

  getSpecificPermmissionOfRole(roleId: number, permissionId: number) {
    return this.rolePermissionRepo
      .createQueryBuilder('role_permissions')
      .select('roles.role_id AS role_id')
      .addSelect('permissions.*')
      .addSelect('role_permissions.is_active AS is_active')
      .innerJoin('role_permissions.role', 'roles')
      .innerJoin('role_permissions.permission', 'permissions')
      .where(
        'role_permissions.role_id = :roleId AND role_permissions.permission_id = :permissionId',
        { roleId, permissionId },
      )
      .execute();
  }

  createNewRole(createNewRoleDto: CreateNewRoleDto) {
    return this.roleRepo.insert(createNewRoleDto);
  }

  // FIXME error when declare roleId: number, permissionId: number
  addPermissionToRole(roleId, permissionId) {
    return this.rolePermissionRepo.insert({
      role: roleId,
      permission: permissionId,
    });
  }

  updateRoleInfo(roleId: number, updateRoleInfoDto: UpdateRoleInfoDto) {
    return this.roleRepo.update({ role_id: roleId }, updateRoleInfoDto);
  }

  updateIsActivePermissionsOfRole(
    roleId: number,
    permissionId: number,
    is_active: number,
  ) {
    return this.rolePermissionRepo
      .createQueryBuilder('role_permissions')
      .update('role_permissions')
      .set({ is_active })
      .where(
        'role_permissions.role_id = :roleId AND role_permissions.permission_id = :permissionId',
        { roleId, permissionId },
      );
  }

  // FIXME error when declare roleId: number, permissionId: number
  removePermissionFromRole(roleId, permissionId) {
    return this.rolePermissionRepo.delete({
      role: roleId,
      permission: permissionId,
    });
  }

  deleteRoleUserDefined(roleId: number) {
    return this.roleRepo.delete({ role_id: roleId });
  }
}
