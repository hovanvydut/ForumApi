import { Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import { isPublishedConstant } from '../enums/is-published.enum';

const { YES, NO } = isPublishedConstant;
export class IsPublishedDto {
  @IsIn([YES, NO])
  @Transform(value => Number(value))
  is_published: number;
}
