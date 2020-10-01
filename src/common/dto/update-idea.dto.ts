import { MinLength } from 'class-validator';

export class UpdateIdeaDto {
  @MinLength(2)
  idea_name?: string;

  @MinLength(10)
  idea_description?: string;

  // NOTE adjugt least 50 character
  @MinLength(5)
  idea_content?: string;
}
