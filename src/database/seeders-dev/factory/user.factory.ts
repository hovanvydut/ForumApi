import { UserEntity } from 'src/app/user/entity/user.entity';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker: typeof Faker) => {
  const name = faker.name.findName();
  const email = faker.internet.email(name);
  const password = faker.internet.password();

  const user = new UserEntity();
  user.fullname = name;
  user.email = email;
  user.password = password;
  return user;
});
