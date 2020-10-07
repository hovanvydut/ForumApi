import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/app/user/service/user.service';
import { HelperUtil } from 'src/shared/helper.util';
import { isActiveList } from '../../../common/enums/is-active.enum';
import { PermissionList } from '../../../common/list/permission.list';

const helperUtil = HelperUtil.getInstance();

@Injectable()
export class AuthPermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndMerge(
      'requiredPermissions',
      [context.getClass(), context.getHandler()],
    );

    if (requiredPermissions.length == 0) return true;

    let isSuperAdmin = false;
    const request = context.switchToHttp().getRequest();
    const reqUser: IReqUser = request.user;
    const raws = await this.userService.getAllPermission(reqUser.user_id);
    const blockPermission = [];
    const userPermissions = raws
      .map(item => {
        if (
          item.permission_code_1 === PermissionList.FULL ||
          item.permission_code_2 == PermissionList.FULL
        ) {
          isSuperAdmin = true;
          return PermissionList.FULL;
        }
        if (item.is_active_1 == isActiveList.YES && item.permission_code_1)
          return item.permission_code_1;
        if (item.is_active_2 == isActiveList.YES && item.permission_code_2)
          return item.permission_code_2;

        if (item.is_active_1 == isActiveList.NEVER && item.permission_code_1) {
          blockPermission.push(item.permission_code_1);
        }
        if (item.is_active_2 == isActiveList.NEVER && item.permission_code_2) {
          blockPermission.push(item.permission_code_2);
        }
      })
      .filter(item => item);

    for (let i = 0; i < blockPermission.length; i++) {
      const idx = userPermissions.findIndex(
        value => value == blockPermission[i],
      );
      if (idx > -1) {
        userPermissions.splice(idx, 1);
      }
    }

    // LOG
    console.log(userPermissions);

    if (isSuperAdmin) return true;

    const checkedPermissions = helperUtil.intersection(
      requiredPermissions,
      userPermissions,
    );

    return checkedPermissions.length > 0;
  }
}
