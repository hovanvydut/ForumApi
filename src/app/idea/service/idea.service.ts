import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from 'src/common/dto/create-idea.dto';
import { UpdateIdeaDto } from 'src/common/dto/update-idea.dto';
import { SlugifyUtil } from 'src/shared/slugify.util';
import { IdeaEntity } from '../entity/idea.entity';
import { IdeaRepository } from '../repository/idea.repository';

@Injectable()
export class IdeaService {
  private slugifyUtil: SlugifyUtil;

  constructor(private readonly ideaRepo: IdeaRepository) {
    this.slugifyUtil = SlugifyUtil.getInstance();
  }

  getAllIdeas() {
    return this.ideaRepo.find({});
  }

  getSpecIdea(ideaId: number) {
    return this.ideaRepo.findOne({ idea_id: ideaId });
  }

  async createNewIdea(createIdeaDto: CreateIdeaDto) {
    const slug = this.slugifyUtil.getSlug(createIdeaDto.idea_name);
    createIdeaDto['idea_slug'] = slug;
    const raw = await this.ideaRepo.insert(createIdeaDto);
    return this.ideaRepo
      .createQueryBuilder()
      .relation(IdeaEntity, 'author')
      .of(raw.identifiers[0].idea_id)
      .set(createIdeaDto.author_id);
  }

  updateIdea(ideaId: number, updateIdeaDto: UpdateIdeaDto) {
    console.log(updateIdeaDto);
    return this.ideaRepo.update({ idea_id: ideaId }, updateIdeaDto);
  }

  softDeleteIdea(ideaId) {
    return this.ideaRepo.softDelete({ idea_id: ideaId });
  }

  restoreIdea(ideaId) {
    return this.ideaRepo.restore({ idea_id: ideaId });
  }

  deleteIdea(ideaId: number) {
    return this.ideaRepo.delete({ idea_id: ideaId });
  }
}
