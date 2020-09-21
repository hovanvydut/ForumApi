import { MinLength } from 'class-validator';

export class UpdateDescriptionPermisisonDto {
  @MinLength(2)
  permission_description: string;
}
