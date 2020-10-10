import { MinLength } from 'class-validator';

export class CreateCommentDto {
    @MinLength(1)
    comment_content: string;
}
