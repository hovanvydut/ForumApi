import { MinLength } from 'class-validator';

export class UpdateGroupInfoDto {
  @MinLength(2)
  group_name: string;

  @MinLength(5)
  group_description: string;
}
