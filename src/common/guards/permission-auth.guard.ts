import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/app/user/service/user.service';
import { HelperUtil } from 'src/shared/helper.util';
import { isActiveList } from '../enums/is-active.enum';
import { PermissionList } from '../list/permission.list';

const helperUtil = HelperUtil.getInstance();

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndMerge(
      'requiredPermissions',
      [context.getClass(), context.getHandler()],
    );

    let isSuperAdmin = false;
    const request = context.switchToHttp().getRequest();
    const reqUser: IReqUser = request.user;
    const raws = await this.userService.getAllPermission(reqUser.user_id);
    const userPermissions = raws
      .map(item => {
        if (
          item.permission_code_2 === PermissionList.FULL &&
          item.permission_code_2 == PermissionList.FULL
        ) {
          isSuperAdmin = true;
          return PermissionList.FULL;
        }
        if (item.is_active_1 == isActiveList.YES && item.permission_code_1)
          return item.permission_code_1;
        if (item.is_active_2 == isActiveList.YES && item.permission_code_2)
          return item.permission_code_2;
      })
      .filter(item => item);

    // LOG
    console.log(raws);
    console.log(userPermissions);

    if (isSuperAdmin) return true;

    const checkedPermissions = helperUtil.intersection(
      requiredPermissions,
      userPermissions,
    );

    return checkedPermissions.length > 0;
  }
}
