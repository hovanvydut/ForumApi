import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';

export default class CreateRolePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data = [
      {
        roleId: 1,
        permissionId: 1,
      },
      {
        roleId: 1,
        permissionId: 2,
      },
      {
        roleId: 1,
        permissionId: 3,
      },
      {
        roleId: 1,
        permissionId: 4,
      },
      {
        roleId: 1,
        permissionId: 5,
      },
      {
        roleId: 2,
        permissionId: 1,
      },
      {
        roleId: 2,
        permissionId: 2,
      },
      {
        roleId: 2,
        permissionId: 3,
      },
      {
        roleId: 2,
        permissionId: 4,
      },
      {
        roleId: 2,
        permissionId: 5,
      },
      {
        roleId: 3,
        permissionId: 1,
      },
      {
        roleId: 3,
        permissionId: 2,
      },
      {
        roleId: 3,
        permissionId: 3,
      },
      {
        roleId: 3,
        permissionId: 4,
      },
    ];

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values(data)
      .execute();
  }
}
