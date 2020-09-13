import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/app/user/service/user.service';
import { Permission } from 'src/app/permission/entity/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const reqUser: IReqUser = request.user;

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const user = await this.userService.getPermission(reqUser.id);
    const userPermissions: Permission[] = user.role['permissions'].map(
      permission => permission.name,
    );
    return intersection(userPermissions, requiredPermissions).length > 0;
  }
}

function intersection(array1, array2): any[] {
  let result = new Set();
  for (let item1 of array1) {
    if (array2.includes(item1)) result.add(item1);
  }
  return [...result];
}
