import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repository/media.repository';
import { CloudinaryUtil } from 'src/shared/cloudinary.util';
import { MediaEntity } from '../entity/media.entity';
import { IdeaEntity } from 'src/app/idea/entity/idea.entity';

@Injectable()
export class MediaService {
  private cloudinaryUtil: CloudinaryUtil;
  constructor(private readonly mediaRepo: MediaRepository) {
    this.cloudinaryUtil = CloudinaryUtil.getInstance();
  }

  async uploadFile(file, ideaId: number) {
    const src = await this.cloudinaryUtil.uploadFile(file);
    const raw = await this.mediaRepo.insert({
      media_src: src,
      media_type: 'image',
    });
    return this.mediaRepo
      .createQueryBuilder()
      .relation(MediaEntity, 'idea')
      .of(raw.identifiers[0].media_id)
      .set(ideaId);
  }

  deleteMedia(idea: IdeaEntity, mediaId: number) {
    // FIXME delete file in cloudinary
    return this.mediaRepo.delete({ media_id: mediaId, idea });
  }
}
