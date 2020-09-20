import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { PermissionList } from 'src/common/list/permission.list';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(PermissionList.create_new_user)
  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }
}
