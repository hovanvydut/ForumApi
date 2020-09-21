import { GroupEntity } from './../../../app/group/entity/group.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { GroupListClass } from './../../../common/list/group.list';

const groupListInstance = GroupListClass.getInstance();
const groupData = groupListInstance.exportSeedingData();

export default class CreateGroup implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('groups')
      .values(groupData)
      .execute();
  }
}
