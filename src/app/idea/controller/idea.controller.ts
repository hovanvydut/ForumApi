import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateCommentDto } from 'src/common/dto/create-comment.dto';
import { CreateIdeaDto } from 'src/common/dto/create-idea.dto';
import { IsPublishedDto } from 'src/common/dto/is-published.dto';
import { UpdateIdeaDto } from 'src/common/dto/update-idea.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { IdeaService } from '../service/idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Auth(PermissionList.read_group_any)
  @Get()
  getAllIdeas() {
    return this.ideaService.getAllIdeas();
  }

  @Get('/:ideaId')
  getSpecIdea(@Param('ideaId') ideaId: number) {
    return this.ideaService.getSpecIdea(ideaId);
  }

  @Post()
  createNewIdea(@Body() createIdeaDto: CreateIdeaDto) {
    return this.ideaService.createNewIdea(createIdeaDto);
  }

  @Patch('/:ideaId')
  updateIdea(
    @Param('ideaId') ideaId: number,
    @Body() updateIdeaDto: UpdateIdeaDto,
  ) {
    return this.ideaService.updateIdea(ideaId, updateIdeaDto);
  }

  // FIXME
  @Patch('/:ideadId/publish')
  publishIdea(@Body() isPublishedDto: IsPublishedDto) {
    console.log(isPublishedDto);
  }

  @Patch('/:ideaId/soft-delete')
  softDeleteIdea(@Param('ideaId') ideaId: number) {
    return this.ideaService.softDeleteIdea(ideaId);
  }

  @Patch('/:ideaId/restore')
  restoreIdea(@Param('ideaId') ideaId: number) {
    return this.ideaService.restoreIdea(ideaId);
  }

  // NOTE allow delete many idea by param ?id=1,2,3,4
  @Delete('/:ideaId')
  deleteIdea(@Param('ideaId') ideaId: number) {
    return this.ideaService.deleteIdea(ideaId);
  }

  @Get('/:ideaId/media')
  getAllMedia(@Param('ideaId') ideaId: number) {
    return this.ideaService.getAllMedia(ideaId);
  }

  @Delete('/:ideaId/media/:mediaId')
  deleteMediaOfIdea(
    @Param('ideaId') ideaId: number,
    @Param('mediaId') mediaId: number,
  ) {
    return this.ideaService.deleteMediaOfIdea(ideaId, mediaId);
  }

  @Get('/:ideaId/comments')
  getCommentsOfIdea(@Param('ideaId') ideaId) {
    return this.ideaService.getCommentsOfIdea(ideaId);
  }

  @Post('/:ideaId/comments')
  commentInIdea(
    @Param('ideaId') ideaId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log(createCommentDto);
    return this.ideaService.commentInIdea(ideaId, createCommentDto);
  }

  @Post('/:ideaId/comments/:commentId/reply')
  replyComment(
    @Param('ideaId') ideaId: number,
    @Param('commentId') commentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.ideaService.replyComment(ideaId, commentId, createCommentDto);
  }

  @Patch('/:ideaId/comments/:commentId')
  updateCommentOfIdea(
    @Param('ideaId') ideaId: number,
    @Param('commentId') commentId: number,
  ) {}

  @Delete('/:ideaId/comments/:commentId')
  deleteCommentOfIdea(
    @Param('ideaId') ideaId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.ideaService.deleteCommentOfIdea(ideaId, commentId);
  }

  // @Patch('/:ideaId/comments/:commentId/publish')
  // publishCommentOfIdea() {}
}
