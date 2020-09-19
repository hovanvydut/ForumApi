import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { RoleEntity } from '../entity/role.entity';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepo: RoleRepository) {}

  findOne(conditions: FindConditions<RoleEntity>): Promise<RoleEntity> {
    return this.roleRepo.findOne(conditions);
  }
}
