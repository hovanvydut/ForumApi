import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';
import { MediaModule } from '../media/media.module';
import { IdeaController } from './controller/idea.controller';
import { IdeaRepository } from './repository/idea.repository';
import { IdeaService } from './service/idea.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdeaRepository]),
    AuthModule,
    MediaModule,
    CommentModule,
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
