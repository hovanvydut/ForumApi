import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUserPermission implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('groups')
      .values([
        {
          user_id: 1,
          permission_id: 1,
        },
      ])
      .execute();
  }
}
