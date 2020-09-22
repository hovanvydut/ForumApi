import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagController } from './controller/tag.controller';

@Module({
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
