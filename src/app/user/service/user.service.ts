import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { GroupService } from 'src/app/group/service/group.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserErrorMsg } from 'src/common/enums/error-message.enum';
import { GroupList } from 'src/common/list/group.list';
import { BcryptUtil } from 'src/shared/bcrypt.util';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    private readonly bcryptUtil = BcryptUtil.getInstance();
    constructor(
        private readonly userRepo: UserRepository,
        private readonly groupService: GroupService,
    ) {}

    findOne(
        conditions: FindConditions<UserEntity>,
    ): Promise<UserEntity | null> {
        return this.userRepo.findOne(conditions);
    }

    getAllUser(queryURL): Promise<UserEntity[]> {
        const MAX_LIMIT = 100;
        const after_id = queryURL.after_id || 0;
        const before_id = queryURL.before_id;
        const limit = queryURL.limit || MAX_LIMIT;
        const queryDict: Map<string, 'ASC' | 'DESC'> = new Map();

        queryURL.sort_by
            .replace(/\s/g, '')
            .split(',')
            .forEach(item => {
                // 'desc(id),asc(email)' => ['desc(id)', 'asc(email)']
                // => Map { 'id' => 'DESC', 'email' => 'ASC' }
                const key = /\((.*)\)/.exec(item);
                const value = /.*(?=\()/.exec(item);
                if (key && key[0]) {
                    queryDict.set(
                        key[1],
                        value[0].toUpperCase() as 'ASC' | 'DESC',
                    );
                }
            });
        console.log(queryDict);

        const query = this.userRepo
            .createQueryBuilder('user')
            .select(['user_id', 'fullname', 'email'])
            .where('user_id > :after_id', { after_id })
            .limit(limit);

        if (before_id) {
            query.andWhere('user_id < :before_id', { before_id });
        }

        queryDict.forEach((value, key) => {
            console.log(value, key);
            query.orderBy(key, value);
        });
        return query.execute();
    }

    async getSpecifiedUser(userId: number): Promise<UserEntity> {
        const user = await this.userRepo.findOne(
            { user_id: userId },
            { select: ['user_id', 'fullname', 'email'] },
        );
        if (!user)
            throw new ConflictException({
                message: UserErrorMsg.USER_NOT_FOUND,
            });
        return user;
    }

    getSoftDeletedUser(): Promise<UserEntity[]> {
        console.log('here');
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

    getGroupsOfUser(userId: number) {
        return this.userRepo
            .createQueryBuilder('users')
            .select(['groups.*'])
            .innerJoin('users.groupUsers', 'group_users')
            .innerJoin('group_users.group', 'groups')
            .where('users.user_id = :userId', { userId })
            .execute();
    }

    async createNewUser(createUserDto: CreateUserDto) {
        if (await this.findOne({ email: createUserDto.email }))
            throw new ConflictException({ message: UserErrorMsg.EMAIL_EXIST });

        // hash password before inserting
        createUserDto.password = this.bcryptUtil.generateHash(
            createUserDto.password,
        );

        const result = await this.userRepo.insert(createUserDto);
        const userEntity = await this.userRepo.findOne({
            user_id: result.identifiers[0].user_id,
        });

        // if inserting success, assign default-group to user
        if (result.identifiers.length > 0)
            await this.groupService.assignUserOfGroup(userEntity, {
                group_code: GroupList.REGISTERED_USERS,
            });
        else throw new InternalServerErrorException();
    }

    async getAllPermission(userId: number): Promise<IReturnedPermission[]> {
        const user = await this.findOne({ user_id: userId });
        if (!user)
            throw new ConflictException({
                message: UserErrorMsg.USER_NOT_FOUND,
            });
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
