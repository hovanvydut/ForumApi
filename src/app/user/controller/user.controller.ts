import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Auth(PermissionList.read_user_any)
    @Get()
    getAllUser(@Query() query): Promise<UserEntity[] | UserEntity> {
        // filter, sort, limit, pagination
        console.log(query);
        return this.userService.getAllUser(query);
    }

    @Auth(PermissionList.read_user_any)
    @Get('/:userId')
    getSpecifiedUser(
        @Param('userId') userId: number,
    ): Promise<UserEntity[] | UserEntity> {
        return this.userService.getSpecifiedUser(userId);
    }

    @Auth(PermissionList.read_user_any)
    @Get('/:userId/groups')
    getGroupsOfUser(@Param('userId') userId: number) {
        return this.userService.getGroupsOfUser(userId);
    }

    @Auth(PermissionList.read_user_any)
    @Get('/:userId/groups/:groupId')
    getSpecGroupOfUser() {}

    @Auth(PermissionList.read_user_any)
    @Get('/soft-delete')
    getSoftDeletedUser(): Promise<UserEntity[]> {
        console.log('here');
        return this.userService.getSoftDeletedUser();
    }

    @Auth(PermissionList.create_new_user)
    @Post()
    createNewUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createNewUser(createUserDto);
    }

    @Auth(PermissionList.restore_user)
    @Patch('/:userId/restore')
    restoreDeletedUser(@Param('userId') userId: number) {
        return this.userService.restoreDeletedUser(userId);
    }

    @Auth(PermissionList.delete_user_soft)
    @Patch('/:userId/soft-delete')
    softRemoveUser(@Param('userId') userId: number) {
        return this.userService.softRemoveUser(userId);
    }

    @Auth(PermissionList.delete_user_permanently)
    @Delete('/:userId')
    deleteUser(@Param('userId') userId: number) {
        return this.userService.deleteUser(userId);
    }

    // NOTE block comment user ....
}
