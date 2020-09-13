import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleName } from '../../../common/enums/role.enum';
import { Role } from '../../../app/role/entity/role.entity';
import { enumToArray } from '../utils/helper.util';

interface IRoleNameData {
  name: string;
  description: string;
  priority: number;
}

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data: IRoleNameData[] = enumToArray(RoleName).map(
      (roleName, idx) => ({
        name: roleName,
        description: 'Default description',
        priority: (idx + 1) * 100 - 50, // 50 150 250 ...
      }),
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(data)
      .execute();
  }
}
