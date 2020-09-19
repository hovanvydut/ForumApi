import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserErrorMsg } from 'src/common/enums/error-message.enum';
import { GroupList } from 'src/common/list/group.list';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserGroupService } from './user-group.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userGroupService: UserGroupService,
  ) {}

  findOne(conditions: FindConditions<UserEntity>): Promise<UserEntity | null> {
    return this.userRepo.findOne(conditions);
  }

  async createNewUser(createUserDto: CreateUserDto) {
    if (await this.findOne({ email: createUserDto.email }))
      throw new ConflictException({ message: UserErrorMsg.EMAIL_EXIST });

    const result = await this.userRepo.insert(createUserDto);
    if (result.identifiers.length > 0)
      await this.userGroupService.assignUserOfGroup(
        result.identifiers[0].id,
        GroupList.REGISTERED_USERS,
      );
    else throw new InternalServerErrorException();
  }
}
