import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }
}
