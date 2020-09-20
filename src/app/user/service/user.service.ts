import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserErrorMsg } from 'src/common/enums/error-message.enum';
import { isActiveList } from 'src/common/enums/is-active.enum';
import { GroupList } from 'src/common/list/group.list';
import { BcryptUtil } from 'src/shared/bcrypt.util';
import { FindConditions } from 'typeorm';
import { UserGroupEntity } from '../entity/user-group.entity';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserGroupService } from './user-group.service';

@Injectable()
export class UserService {
  private readonly bcryptUtil = BcryptUtil.getInstance();
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

    createUserDto.password = this.bcryptUtil.generateHash(
      createUserDto.password,
    );

    const result = await this.userRepo.insert(createUserDto);

    if (result.identifiers.length > 0)
      await this.userGroupService.assignUserOfGroup(
        result.identifiers[0].user_id,
        GroupList.REGISTERED_USERS,
      );
    else throw new InternalServerErrorException();
  }

  async getAllPermission(userId: number): Promise<IReturnedPermission[]> {
    const user = await this.findOne({ user_id: userId });

    if (!user)
      throw new ConflictException({ message: UserErrorMsg.USER_NOT_FOUND });

    return this.userRepo
      .createQueryBuilder('user')
      .select('permissions.permission_code as permission_code_1')
      .addSelect('role_permissions.is_active as is_active_1')
      .addSelect('permission_2.permission_code as permission_code_2')
      .addSelect('group_roles.is_active as is_active_2')
      .leftJoin('user.userGroups', 'user_groups')
      .leftJoin('user_groups.group', 'groups')
      .leftJoin('groups.groupRoles', 'group_roles')
      .leftJoin('group_roles.role', 'roles')
      .leftJoin('roles.rolePermissions', 'role_permissions')
      .leftJoin(
        'role_permissions.permission',
        'permissions',
        // 'role_permissions.is_active = :YES',
        // { YES: isActiveList.YES },
      )
      .leftJoin(
        'permissions',
        'permission_2', // alias of permission table
        'group_roles.permission_id = permission_2.permission_id',
        // 'group_roles.is_active = :YES AND group_roles.permission IS NOT NULL AND permission_2.permission_id = group_roles.permission_id ',
        // { YES: isActiveList.YES },
      )
      .where('user.user_id = :userId', { userId })
      .getRawMany();
  }
}

interface IReturnedPermission {
  permission_code_1: string;
  is_active_1: number;
  permission_code_2?: string;
  is_active_2?: number;
}
