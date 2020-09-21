import { MinLength } from 'class-validator';

export class CreatePermissionDto {
  @MinLength(1)
  permission_code: string;

  @MinLength(1)
  permission_description: string;
}
