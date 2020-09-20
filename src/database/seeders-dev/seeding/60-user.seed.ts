import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('groups')
      .values([
        {
          fulllname: 'Super Admin',
          email: 'superadmin@gmail.com',
          password:
            '$2b$10$PwSeJ5cBsjuH/L1lyhH.nO8K8D.RaGszkG8O8oq078vtNJ0fDMfgi',
        },
      ])
      .execute();
  }
}
