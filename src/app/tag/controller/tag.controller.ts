import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateTagDto } from 'src/common/dto/create-tag.dto';
import { UpdateTagDto } from 'src/common/dto/update-tag.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { TagService } from '../service/tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @Auth(PermissionList.delete_user_permanently)
  @Get('/:tagId')
  getSpecTag(@Param('tagId') tagId: number) {
    return this.tagService.getSpecTag(tagId);
  }

  @Get('/:tagId/ideas')
  getIdeasRelateTag() {}

  @Post()
  createNewTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createNewTag(createTagDto);
  }

  @Patch('/:tagId')
  updateTag(@Param('tagId') tagId: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(tagId, updateTagDto);
  }

  @Delete('/:tagId')
  deleteTag(@Param('tagId') tagId: number) {
    return this.tagService.deleteTag(tagId);
  }
}
