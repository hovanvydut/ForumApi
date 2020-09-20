import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionAuthGuard } from '../guards/permission-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Auth(...requiredPermissions) {
  return applyDecorators(
    SetMetadata('requiredPermissions', requiredPermissions),
    UseGuards(JwtAuthGuard, PermissionAuthGuard),
  );
}
