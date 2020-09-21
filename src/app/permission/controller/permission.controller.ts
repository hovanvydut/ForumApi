import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreatePermissionDto } from 'src/common/dto/create-permission.dto';
import { UpdateDescriptionPermisisonDto } from 'src/common/dto/update-description-permission.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { PermissionEntity } from '../entity/permission.entity';
import { PermissionService } from '../service/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Auth(PermissionList.read_permission_any)
  @Get()
  getAllPermissions(): Promise<PermissionEntity[]> {
    return this.permissionService.getAllPermission();
  }

  @Auth(PermissionList.read_permission_any)
  @Get('/:permissionId')
  getSpecificPermission(
    @Param('permissionId') permissionId: number,
  ): Promise<PermissionEntity> {
    return this.permissionService.getSpecificPermission(permissionId);
  }

  @Auth(PermissionList.create_permission)
  @Post()
  createNewPermission(@Body() createPermisisonDto: CreatePermissionDto) {
    return this.permissionService.createNewPermission(createPermisisonDto);
  }

  @Auth(PermissionList.update_description_permission)
  @Patch('/:permissionId')
  updateDescriptionPermission(
    @Param('permissionId') permissionId: number,
    @Body() updateDescripPermDto: UpdateDescriptionPermisisonDto,
  ) {
    return this.permissionService.updateDescriptionPermission(
      permissionId,
      updateDescripPermDto,
    );
  }
}
