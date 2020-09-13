import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';
import { Permission } from '../../../app/permission/entity/permission.entity';

export default class CreateModule implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data = [
      {
        name: 'GET_USER',
        methodId: 1,
        moduleId: 1,
      },
      {
        name: 'POST_USER',
        methodId: 2,
        moduleId: 1,
      },
      {
        name: 'PUT_USER',
        methodId: 3,
        moduleId: 1,
      },
      {
        name: 'PATCH_USER',
        methodId: 4,
        moduleId: 1,
      },
      {
        name: 'DELETE_USER',
        methodId: 5,
        moduleId: 1,
      },
    ];

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(data)
      .execute();
  }
}
