import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Method } from '../../../app/method/entity/method.entity';
import { MethodName } from '../../../common/enums/method.enum';
import { enumToArray } from '../utils/helper.util';

interface IMethodNameData {
  name: string;
}

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data: IMethodNameData[] = enumToArray(MethodName).map(methodName => ({
      name: methodName,
    }));

    await connection
      .createQueryBuilder()
      .insert()
      .into(Method)
      .values(data)
      .execute();
  }
}
