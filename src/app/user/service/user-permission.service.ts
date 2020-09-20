import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleService } from 'src/app/role/service/role.service';
import { RoleErrorMsg } from 'src/common/enums/error-message.enum';
import { UserPermissionRepository } from '../repository/user-permission.repository';

@Injectable()
export class UserPermissionService {
  constructor(
    private readonly userPerRoleRepo: UserPermissionRepository,
    private readonly roleService: RoleService,
  ) {}

  async assignRole(userId: number, role_code: string) {
    const role = await this.roleService.findOne({ role_code });
    if (!role)
      throw new NotFoundException({ message: RoleErrorMsg.ROLE_NOT_FOUND });
  }
}
