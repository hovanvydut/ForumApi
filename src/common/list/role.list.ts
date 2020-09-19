export class RoleListClass {
    private static instance;
    private data = roleData;

    private constructor() {}

    public static getInstance(): RoleListClass {
        if (!RoleListClass.instance)
            RoleListClass.instance = new RoleListClass();
        return RoleListClass.instance;
    }

    public getIdByCode(role_code: string): number {
        const idx = this.data.findIndex(item => item.role_code === role_code);

        if (idx == -1) return 0;

        return idx + 1;
    }

    public exportSeedingData(): IRoleData[] {
        return this.data;
    }

    public exportList() {
        return RoleList;
    }
}

export enum RoleList {
    ADMIN_SUPER = 'ADMIN_SUPER',
    ADMIN_STANDARD = 'ADMIN_STANDARD',
    MOD_FULL = 'MOD_FULL',
    MOD_STANDARD = 'MOD_STANDARD',
    MOD_QUEUE = 'MOD_QUEUE',
    USER_FULL = 'USER_FULL',
    USER_STANDARD = 'USER_STANDARD',
}

interface IRoleData {
    role_name: string;
    role_code: string;
    role_description: string;
}

const roleData: IRoleData[] = [
    {
        role_name: 'Super Admin',
        role_code: RoleList.ADMIN_SUPER,
        role_description: 'Super xayda',
    },
    {
        role_name: 'Standard Admin',
        role_code: RoleList.ADMIN_STANDARD,
        role_description:
            'Has access to most administrative features but is not allowed to use server or system related tools.',
    },
    {
        role_name: 'Full Moderator',
        role_code: RoleList.MOD_FULL,
        role_description: 'Can use all moderating features, including banning.',
    },
    {
        role_name: 'Standard Moderator',
        role_code: RoleList.MOD_STANDARD,
        role_description:
            'Can use most moderating tools, but cannot ban users or change the post author.',
    },
    {
        role_name: 'Queue Moderator',
        role_code: RoleList.MOD_QUEUE,
        role_description:
            'Can use the Moderation Queue to validate and edit posts, but nothing else.',
    },
    {
        role_name: 'All Features',
        role_code: RoleList.USER_FULL,
        role_description:
            'Can use all available forum features for users, including changing the user name or ignoring the flood limit.',
    },
    {
        role_name: 'Standard Features',
        role_code: RoleList.USER_STANDARD,
        role_description:
            'Can access most but not all user features. Cannot change user name or ignore the flood limit, for instance.',
    },
];
