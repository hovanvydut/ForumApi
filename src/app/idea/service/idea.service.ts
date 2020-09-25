import { Injectable } from '@nestjs/common';
import { MediaService } from 'src/app/media/service/media.service';
import { CreateIdeaDto } from 'src/common/dto/create-idea.dto';
import { UpdateIdeaDto } from 'src/common/dto/update-idea.dto';
import { SlugifyUtil } from 'src/shared/slugify.util';
import { IdeaEntity } from '../entity/idea.entity';
import { IdeaRepository } from '../repository/idea.repository';

@Injectable()
export class IdeaService {
  private slugifyUtil: SlugifyUtil;

  constructor(
    private readonly ideaRepo: IdeaRepository,
    private readonly mediaService: MediaService,
  ) {
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

  getAllMedia(ideaId: number) {
    return this.ideaRepo
      .createQueryBuilder('idea')
      .select(['media.*'])
      .innerJoin('idea.media', 'media')
      .where('idea.idea_id = :ideaId', { ideaId })
      .execute();
  }

  uploadFile(file, ideaId: number) {
    return this.mediaService.uploadFile(file, ideaId);
  }

  async deleteMediaOfIdea(ideaId: number, mediaId: number) {
    const idea = await this.ideaRepo.findOne({ idea_id: ideaId });
    return this.mediaService.deleteMedia(idea, mediaId);
  }
}
