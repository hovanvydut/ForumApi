import { Module } from '@nestjs/common';
import { VoteController } from './controller/vote.controller';
import { VoteService } from './service/vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
