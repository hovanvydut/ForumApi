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
    update_description_permission = 'update_description_permission',
    // 1.2 role
    update_description_role = 'update_description_role',
    update_permission_role = 'update_permission_role',
    // 1.3 Group
    create_group = 'create_group',
    update_description_group = 'update_description_group',
    delete_group = 'delete_group',
    create_user_group = 'create_user_group',
    delete_user_group = 'delete_user_group',
    update_role_group = 'update_role_group',
    // 1.4 user
    update_fullname_user_any = 'update_fullname_user_any',
    update_email_user_any = 'update_email_user_any',
    update_profile_user_any = 'update_profile_user_any',
    update_password_user_any = 'update_password_user_any',
    create_new_user = 'create_new_user',
    // MOD
    // USER
    update_fullname_user_own = 'update_fullname_user_own',
    update_password_user_own = 'update_password_user_any',
}

interface IPermissionData {
    permission_code: string;
    permission_description: string;
}

const permmissionDatas: IPermissionData[] = [
    {
        // permmission_id: 1,
        permission_code: PermissionList.FULL,
        permission_description: 'Full permissions',
    },
    //1. ADMIN
    {
        // permmission_id: 2,
        permission_code: PermissionList.update_status_config,
        permission_description: 'None',
    },
    // 1.1 permission
    {
        // permmission_id: 3,
        permission_code: PermissionList.update_description_permission,
        permission_description: 'None',
    },
    // 1.2 role
    {
        // permmission_id: 4,
        permission_code: PermissionList.update_description_role,
        permission_description: 'None',
    },
    {
        // permmission_id: 5,
        permission_code: PermissionList.update_permission_role,
        permission_description: 'None',
    },
    // 1.3 Group
    {
        // permmission_id: 6,
        permission_code: PermissionList.create_group,
        permission_description: 'None',
    },
    {
        // permmission_id: 7,
        permission_code: PermissionList.update_description_group,
        permission_description: 'None',
    },
    {
        // permmission_id: 8,
        permission_code: PermissionList.delete_group,
        permission_description: 'None',
    },
    {
        // permmission_id: 9,
        permission_code: PermissionList.create_user_group,
        permission_description: 'None',
    },
    {
        // permmission_id: 10,
        permission_code: PermissionList.delete_user_group,
        permission_description: 'None',
    },
    {
        // permmission_id: 11,
        permission_code: PermissionList.update_role_group,
        permission_description: 'None',
    },
    // 1.4 user
    {
        // permmission_id: 12,
        permission_code: PermissionList.update_fullname_user_any,
        permission_description: 'None',
    },
    {
        // permmission_id: 13,
        permission_code: PermissionList.update_email_user_any,
        permission_description: 'None',
    },
    {
        // permmission_id: 14,
        permission_code: PermissionList.update_profile_user_any,
        permission_description: 'None',
    },
    {
        // permmission_id: 15,
        permission_code: PermissionList.update_password_user_any,
        permission_description: 'None',
    },
    {
        // permmission_id: 16,
        permission_code: PermissionList.create_new_user,
        permission_description: 'None',
    },
    // MOD

    // USER
    {
        // permmission_id: 17,
        permission_code: PermissionList.update_fullname_user_own,
        permission_description: 'None',
    },
    {
        // permmission_id: 18,
        permission_code: PermissionList.update_password_user_own,
        permission_description: 'None',
    },
];
