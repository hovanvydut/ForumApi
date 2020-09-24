import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthPermissionGuard } from '../../app/auth/guards/permission-auth.guard';
import { JwtAuthGuard } from '../../app/auth/guards/jwt-auth.guard';

export function Auth(...requiredPermissions) {
  return applyDecorators(
    SetMetadata('requiredPermissions', requiredPermissions),
    UseGuards(JwtAuthGuard, AuthPermissionGuard),
  );
}
