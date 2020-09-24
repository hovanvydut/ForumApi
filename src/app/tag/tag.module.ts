import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import { TagController } from './controller/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repository/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
