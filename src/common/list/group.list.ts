export class GroupListClass {
  private static instance;
  private data = groupData;

  private constructor() {}

  public static getInstance(): GroupListClass {
    if (!GroupListClass.instance)
      GroupListClass.instance = new GroupListClass();
    return GroupListClass.instance;
  }

  public getIdByCode(group_code): number {
    const idx = this.data.findIndex(item => item.group_code === group_code);
    if (idx === -1) return 0;
    return idx + 1;
  }

  public exportSeedingData(): IGroupData[] {
    return this.data;
  }

  public exportList() {
    return GroupList;
  }
}

export enum GroupList {
  ADMINISTATORS = 'ADMINISTATORS',
  MODERATORS = 'MODERATORS',
  REGISTERED_USERS = 'REGISTERED_USERS',
  GUEST = 'GUEST',
}

interface IGroupData {
  group_name: string;
  group_code: string;
  group_description: string;
}

const groupData: IGroupData[] = [
  {
    group_name: 'Administrators',
    group_code: GroupList.ADMINISTATORS,
    group_description: 'None',
  },
  {
    group_name: 'Moderators',
    group_code: GroupList.MODERATORS,
    group_description: 'None',
  },
  {
    group_name: 'Registered users',
    group_code: GroupList.REGISTERED_USERS,
    group_description: 'None',
  },
  {
    group_name: 'Guest',
    group_code: GroupList.GUEST,
    group_description: 'None',
  },
];
