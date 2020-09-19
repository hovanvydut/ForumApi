import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import {
    PermissionListClass,
    PermissionList,
} from './../../../common/list/permission.list';
import { RoleListClass, RoleList } from './../../../common/list/role.list';

const perm = PermissionListClass.getInstance();
const role = RoleListClass.getInstance();

export default class CreateRolePermission implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('role_permissions')
            .values(rolePermissionsData)
            .execute();
    }
}

const rolePermissionsData = [
    // Super Admin
    {
        role: role.getIdByCode(RoleList.ADMIN_SUPER),
        permission: perm.getIdByCode(PermissionList.FULL),
        autho_setting: 1,
    },

    // Standard Admin
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(
            PermissionList.update_description_permission,
        ),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_description_role),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_permission_role),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.create_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_description_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.delete_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.create_user_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.delete_user_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_role_group),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_fullname_user_any),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_email_user_any),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_profile_user_any),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_password_user_any),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.ADMIN_STANDARD),
        permission: perm.getIdByCode(PermissionList.create_new_user),
        autho_setting: 1,
    },

    // Standard Features
    {
        role: role.getIdByCode(RoleList.USER_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_fullname_user_own),
        autho_setting: 1,
    },
    {
        role: role.getIdByCode(RoleList.USER_STANDARD),
        permission: perm.getIdByCode(PermissionList.update_password_user_own),
        autho_setting: 1,
    },
];
