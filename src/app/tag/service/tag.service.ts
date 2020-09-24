import { Injectable } from '@nestjs/common';
import { CreateTagDto } from 'src/common/dto/create-tag.dto';
import { UpdateTagDto } from 'src/common/dto/update-tag.dto';
import { TagRepository } from '../repository/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  getAllTags() {
    return this.tagRepo.find();
  }

  getSpecTag(tagId: number) {
    return this.tagRepo.findOne({ tag_id: tagId });
  }

  createNewTag(createTagDto: CreateTagDto) {
    return this.tagRepo.insert(createTagDto);
  }

  updateTag(tagId: number, updateTagDto: UpdateTagDto) {
    return this.tagRepo.update({ tag_id: tagId }, updateTagDto);
  }

  deleteTag(tagId: number) {
    return this.tagRepo.delete({ tag_id: tagId });
  }
}
