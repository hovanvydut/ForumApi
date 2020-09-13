import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Module } from '../../../app/module/entity/module.entity';
import { ModuleName } from '../../../common/enums/module.enum';
import { enumToArray } from '../utils/helper.util';

interface IModuleName {
  name: string;
}

export default class CreateModule implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const data: IModuleName[] = enumToArray(ModuleName).map(moduleName => ({
      name: moduleName,
    }));

    await connection
      .createQueryBuilder()
      .insert()
      .into(Module)
      .values(data)
      .execute();
  }
}
