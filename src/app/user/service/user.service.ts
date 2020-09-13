import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { Role } from 'src/app/role/entity/role.entity';
import { FindConditions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(conditions: FindConditions<User>): Promise<User | undefined> {
    return this.userRepository.findOne(conditions);
  }

  getPermission(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('user.id = :id', { id })
      .getOne();
  }
}
