import { MinLength } from 'class-validator';

export class UpdateRoleInfoDto {
  @MinLength(2)
  role_name: string;

  @MinLength(5)
  role_description: string;
}
