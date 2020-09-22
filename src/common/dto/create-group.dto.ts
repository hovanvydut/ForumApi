import { MinLength } from 'class-validator';

export class CreateGroupDto {
  @MinLength(2)
  group_name: string;

  @MinLength(2)
  group_code: string;

  @MinLength(5)
  group_description: string;
}
