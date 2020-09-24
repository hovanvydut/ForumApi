import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, MinLength } from 'class-validator';

export class CreateIdeaDto {
  @MinLength(2)
  idea_name: string;

  @IsNumber()
  @Transform(value => Number(value))
  author_id: number;

  @MinLength(10)
  idea_description: string;

  // NOTE adjugt least 50 character
  @MinLength(5)
  idea_content: string;
}
