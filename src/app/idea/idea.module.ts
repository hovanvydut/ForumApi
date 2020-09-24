import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { IdeaController } from './controller/idea.controller';
import { IdeaRepository } from './repository/idea.repository';
import { IdeaService } from './service/idea.service';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaRepository]), AuthModule],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
