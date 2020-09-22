import { Module } from '@nestjs/common';
import { MediaService } from './service/media.service';
import { MediaController } from './controller/media.controller';

@Module({
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
