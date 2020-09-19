import { GroupRoleEntity } from './../../../app/group/entity/group-role.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { GroupListClass, GroupList } from './../../../common/list/group.list';
import { RoleListClass, RoleList } from './../../../common/list/role.list';

const group = GroupListClass.getInstance();
const role = RoleListClass.getInstance();

export default class CreateGroupRole implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('group_roles')
            .values(groupRoleData)
            .execute();
    }
}

const groupRoleData = [
    {
        group: group.getIdByCode(GroupList.REGISTERED_USERS),
        role: role.getIdByCode(RoleList.USER_STANDARD),
    },
];
