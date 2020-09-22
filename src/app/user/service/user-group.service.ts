import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroupEntity } from 'src/app/group/entity/group.entity';
import { GroupService } from 'src/app/group/service/group.service';
import {
  GroupErrorMsg,
  UserErrorMsg,
} from 'src/common/enums/error-message.enum';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserGroupRepository } from '../repository/user-group.repository';
import { UserService } from './user.service';

@Injectable()
export class UserGroupService {
  constructor(
    private readonly userGroupRepo: UserGroupRepository,
    private readonly groupService: GroupService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async assignUserOfGroup(
    userId: number,
    credentials: FindConditions<GroupEntity>,
  ) {
    const group = await this.groupService.findOne(credentials);
    const user = await this.userService.findOne({ user_id: userId });
    if (!group)
      throw new NotFoundException({ message: GroupErrorMsg.GROUP_NOT_FOUND });
    if (!user)
      throw new NotFoundException({ message: UserErrorMsg.USER_NOT_FOUND });
    return this.userGroupRepo.insert({ group, user });
  }
}
