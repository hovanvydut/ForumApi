import { Module } from '@nestjs/common';
import { MediaService } from './service/media.service';
import { MediaController } from './controller/media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './repository/media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
