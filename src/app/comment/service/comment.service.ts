import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}
}
