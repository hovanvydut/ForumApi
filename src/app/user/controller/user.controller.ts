import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(@Param('id') userId: number): Promise<UserEntity[] | UserEntity> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getSpecifiedUser(
    @Param('id') userId: number,
  ): Promise<UserEntity[] | UserEntity> {
    return this.userService.getSpecifiedUser(userId);
  }

  @Get('/deleted')
  getSoftDeletedUser(): Promise<UserEntity[]> {
    return this.userService.getSoftDeletedUser();
  }

  @Auth(PermissionList.create_new_user)
  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Patch('/:id/restore')
  restoreDeletedUser(@Param('id') userId: number) {
    return this.userService.restoreDeletedUser(userId);
  }

  @Patch('/:id/delete')
  softRemoveUser(@Param('id') userId: number) {
    return this.userService.softRemoveUser(userId);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
