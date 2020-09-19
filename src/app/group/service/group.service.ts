import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { GroupEntity } from '../entity/group.entity';
import { GroupRepository } from '../repository/group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepo: GroupRepository) {}

  findOne(conditions: FindConditions<GroupEntity>) {
    return this.groupRepo.findOne(conditions);
  }
}
