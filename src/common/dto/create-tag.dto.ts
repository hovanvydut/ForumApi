import { MinLength } from 'class-validator';

export class CreateTagDto {
  @MinLength(2)
  tag_name: string;
}
