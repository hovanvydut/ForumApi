import { PermissionEntity } from './../../../app/permission/entity/permission.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { PermissionListClass } from './../../../common/list/permission.list';

const permissionListInstance = PermissionListClass.getInstance();
const permissionList = permissionListInstance.exportSeedingData();

export default class CreatePermission implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into('permissions')
            .values(permissionList)
            .execute();
    }
}
