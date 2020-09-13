import { applyDecorators, UseGuards } from '@nestjs/common';
import { SetPermission } from './set-permission.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';

export const Auth = (...permissions: string[]) =>
  applyDecorators(
    SetPermission(...permissions),
    UseGuards(JwtAuthGuard),
    UseGuards(PermissionGuard),
  );
