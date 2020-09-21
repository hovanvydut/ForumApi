import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from 'src/common/dto/create-permission.dto';
import { UpdateDescriptionPermisisonDto } from 'src/common/dto/update-description-permission.dto';
import { PermissionEntity } from '../entity/permission.entity';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  getAllPermission(): Promise<PermissionEntity[]> {
    return this.permissionRepo.find();
  }

  getSpecificPermission(permissionId: number): Promise<PermissionEntity> {
    return this.permissionRepo.findOne({ permission_id: permissionId });
  }

  createNewPermission(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepo.insert(createPermissionDto);
  }

  updateDescriptionPermission(
    permissionId: number,
    updateDescripPermDto: UpdateDescriptionPermisisonDto,
  ) {
    return this.permissionRepo.update(
      { permission_id: permissionId },
      updateDescripPermDto,
    );
  }
}
