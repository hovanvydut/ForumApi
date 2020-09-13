import { SetMetadata } from '@nestjs/common';

export const SetPermission = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
