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
import { CreateIdeaDto } from 'src/common/dto/create-idea.dto';
import { IsPublishedDto } from 'src/common/dto/is-published.dto';
import { UpdateIdeaDto } from 'src/common/dto/update-idea.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { IdeaService } from '../service/idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

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

  @Post('/:ideaId/media/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param('ideaId') ideaId: number) {
    // FIXME add case: user input string
    return this.ideaService.uploadFile(file, ideaId);
  }

  @Delete('/:ideaId/media/:mediaId')
  deleteMediaOfIdea(
    @Param('ideaId') ideaId: number,
    @Param('mediaId') mediaId: number,
  ) {
    return this.ideaService.deleteMediaOfIdea(ideaId, mediaId);
  }

  @Get('/:ideaId/comments')
  getCommentsOfIdea() {}

  @Post('/:ideaId/comments')
  commentInIdea() {}

  @Patch('/:ideaId/comments/:commentId')
  updateCommentOfIdea() {}

  @Delete('/:ideaId/comments/:commentId')
  deleteCommentOfIdea() {}

  @Patch('/:ideaId/comments/:commentId/publish')
  publishCommentOfIdea() {}
}
