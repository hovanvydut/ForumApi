import { RoleEntity } from './../../../app/role/entity/role.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { RoleListClass } from './../../../common/list/role.list';

const roleListInstance = RoleListClass.getInstance();
const roleData = roleListInstance.exportSeedingData();

export default class CreateRole implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('roles')
            .values(roleData)
            .execute();
    }
}
