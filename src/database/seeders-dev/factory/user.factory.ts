import { User } from 'src/app/user/entity/user.entity';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const name = faker.name.findName();
  const email = faker.internet.email(name);
  const password = faker.internet.password();

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  return user;
});
