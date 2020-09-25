import { Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import { isActiveList } from '../enums/is-active.enum';

const { YES, NO, NEVER } = isActiveList;
export class IsActiveDto {
  @IsIn([YES, NO, NEVER])
  @Transform(value => Number(value))
  is_active: number;
}
