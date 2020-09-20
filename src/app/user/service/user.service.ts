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

  getAllUser(): Promise<UserEntity[]> {
    return this.userRepo.find({ select: ['user_id', 'fullname', 'email'] });
  }

  getSpecifiedUser(userId: number): Promise<UserEntity> {
    return this.userRepo.findOne(
      { user_id: userId },
      { select: ['user_id', 'fullname', 'email'] },
    );
  }

  getSoftDeletedUser(): Promise<UserEntity[]> {
    return this.userRepo
      .createQueryBuilder('user')
      .select(['user_id', 'fullname', 'email'])
      .where('user.deletedAt IS NOT NULL')
      .withDeleted()
      .execute();
  }

  softRemoveUser(userId: number) {
    return this.userRepo.softRemove({ user_id: userId });
  }

  async createNewUser(createUserDto: CreateUserDto) {
    if (await this.findOne({ email: createUserDto.email }))
      throw new ConflictException({ message: UserErrorMsg.EMAIL_EXIST });

    // hash password before inserting
    createUserDto.password = this.bcryptUtil.generateHash(
      createUserDto.password,
    );

    const result = await this.userRepo.insert(createUserDto);

    // if inserting success, assign default-group to user
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
    return this.userRepo.getAllPermissions(userId);
  }

  restoreDeletedUser(userId: number) {
    return this.userRepo.restore({ user_id: userId });
  }

  deleteUser(userId: number) {
    return this.userRepo.delete(userId);
  }
}

interface IReturnedPermission {
  permission_code_1: string;
  is_active_1: number;
  permission_code_2?: string;
  is_active_2?: number;
}
