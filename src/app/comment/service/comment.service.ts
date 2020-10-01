import { ConflictException, Injectable } from '@nestjs/common';
import { IdeaEntity } from 'src/app/idea/entity/idea.entity';
import { CreateCommentDto } from 'src/common/dto/create-comment.dto';
import { CommentErrorMsg } from 'src/common/enums/error-message.enum';
import { CommentEntity } from '../entity/comment.entity';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}

  async commentInIdea(idea: IdeaEntity, createCommentDto: CreateCommentDto) {
    const { comment_content } = createCommentDto;
    return this.commentRepo.insert({ idea, comment_content });
  }

  getCommentsOfIdea(idea: IdeaEntity) {
    return this.commentRepo.find({
      where: {
        idea,
      },
      relations: ['idea', 'reply_comment'],
    });
  }

  async replyComment(
    idea: IdeaEntity,
    commentId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const { comment_content } = createCommentDto;
    const comment = await this.commentRepo.findOne({ comment_id: commentId });
    if (!comment) {
      throw new ConflictException({
        message: CommentErrorMsg.COMMENT_NOT_FOUND,
      });
    }

    return this.commentRepo.insert({
      idea,
      reply_comment: comment,
      comment_content,
    });
  }

  async deleteComment(idea: IdeaEntity, commentId: number) {
    const comment = await this.commentRepo.findOne({
      comment_id: commentId,
      idea,
    });
    if (!comment) {
      throw new ConflictException({
        message: CommentErrorMsg.COMMENT_NOT_FOUND,
      });
    }

    return this.commentRepo.remove(comment);
  }
}
