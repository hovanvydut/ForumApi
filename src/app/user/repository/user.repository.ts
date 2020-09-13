import { EntityRepository, Repository, FindConditions } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
