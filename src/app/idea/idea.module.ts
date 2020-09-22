import { Module } from '@nestjs/common';
import { IdeaController } from './controller/idea.controller';
import { IdeaService } from './service/idea.service';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
