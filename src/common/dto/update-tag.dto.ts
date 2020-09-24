import { MinLength } from 'class-validator';

export class UpdateTagDto {
  @MinLength(2)
  tag_name: string;
}
