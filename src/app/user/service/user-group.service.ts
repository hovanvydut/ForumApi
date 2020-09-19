import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroupService } from 'src/app/group/service/group.service';
import { GroupErrorMsg } from 'src/common/enums/error-message.enum';
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

  async assignUserOfGroup(userId: number, groupCode: string) {
    const group = await this.groupService.findOne({ group_code: groupCode });
    const user = await this.userService.findOne({ id: userId });
    if (!group)
      throw new NotFoundException({ message: GroupErrorMsg.GROUP_NOT_FOUND });
    return this.userGroupRepo.insert({ group, user });
  }
}
