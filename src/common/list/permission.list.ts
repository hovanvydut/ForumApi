import { HelperUtil } from './../../shared/helper.util';

const helperUtil = HelperUtil.getInstance();

export class PermissionListClass {
  private static instance;
  private data = permmissionDatas;

  private constructor() {}

  public static getInstance(): PermissionListClass {
    if (!PermissionListClass.instance)
      PermissionListClass.instance = new PermissionListClass();
    return PermissionListClass.instance;
  }

  public getIdByCode(permission_code: string): number {
    const idx = this.data.findIndex(
      item => item.permission_code === permission_code,
    );
    if (idx == -1) return 0;
    return idx + 1;
  }

  public exportSeedingData(): IPermissionData[] {
    return this.data;
  }

  public exportList() {
    return PermissionList;
  }
}

export enum PermissionList {
  FULL = 'FULL',
  //1. ADMIN
  update_status_config = 'update_status_config',
  // 1.1 permission
  read_permission_any = 'read_permission_any',
  create_permission = 'create_permission',
  update_description_permission = 'update_description_permission',
  // 1.2 role
  read_role_any = 'read_role_any',
  create_role = 'create_role',
  update_description_role = 'update_description_role',
  update_name_role = 'update_name_role',
  update_permission_role = 'update_permission_role',
  delete_permission_role = 'delete_permission_role',
  // 1.3 Group
  read_group_any = 'read_group_any',
  create_group = 'create_group',
  add_user_group = 'create_user_group',
  add_role_group = 'update_role_group',
  add_permisison_group = 'update_permisison_group',
  update_name_group = 'update_name_group',
  update_description_group = 'update_description_group',
  delete_group = 'delete_group',
  delete_user_group = 'delete_user_group',
  delete_role_group = 'delete_role_group',
  delete_permission_group = 'delete_permission_group',
  create_new_user = 'create_new_user',
  restore_user = 'restore_user',
  delete_user_soft = 'delete_user_soft',
  delete_user_permanently = 'delete_user_permanently',

  // 1.4 user
  read_user_any = 'read_user_any',
  update_fullname_user_any = 'update_fullname_user_any',
  update_email_user_any = 'update_email_user_any',
  update_profile_user_any = 'update_profile_user_any',
  update_password_user_any = 'update_password_user_any',

  // MOD
  // USER
  read_user_own = 'read_user_own',
  update_fullname_user_own = 'update_fullname_user_own',
  update_password_user_own = 'update_password_user_own',
}

interface IPermissionData {
  permission_code: string;
  permission_description: string;
}

const permmissionDatas: IPermissionData[] = helperUtil
  .enumToArray(PermissionList)
  .map(item => ({ permission_code: item, permission_description: 'NONE' }));

// const permmissionDatas: IPermissionData[] = [
//   {
//     permission_code: PermissionList.FULL,
//     permission_description: 'Full permissions',
//   },
//   //1. ADMIN
//   {
//     permission_code: PermissionList.update_status_config,
//     permission_description: 'None',
//   },
//   // 1.1 permission
//   {
//     permission_code: PermissionList.read_permissions,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.create_permission,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_description_permission,
//     permission_description: 'None',
//   },
//   // 1.2 role
//   {
//     permission_code: PermissionList.update_description_role,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_permission_role,
//     permission_description: 'None',
//   },
//   // 1.3 Group
//   {
//     permission_code: PermissionList.create_group,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_description_group,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.delete_group,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.create_user_group,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.delete_user_group,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_role_group,
//     permission_description: 'None',
//   },
//   // 1.4 user
//   {
//     permission_code: PermissionList.update_fullname_user_any,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_email_user_any,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_profile_user_any,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_password_user_any,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.create_new_user,
//     permission_description: 'None',
//   },
//   // MOD

//   // USER
//   {
//     permission_code: PermissionList.update_fullname_user_own,
//     permission_description: 'None',
//   },
//   {
//     permission_code: PermissionList.update_password_user_own,
//     permission_description: 'None',
//   },
// ];
