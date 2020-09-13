import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PermissionType } from 'src/common/enums/permission.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import myconfig from 'src/config/configuration';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  findById(@Param('id') id: number) {
    console.log(myconfig());
    return this.userService.findOne({ id });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {}

  @Auth(PermissionType.GET_USER)
  @Get('/profile/me')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.email);
  }
}
