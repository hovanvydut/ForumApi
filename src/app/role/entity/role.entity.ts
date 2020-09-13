import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';
import { Permission } from './../../permission/entity/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * priority: 1 <= ADMIN = 50 <= 100, 101 <= MOD = 150 <= 200, 201 <= USER = 250 <= 300
   */
  @Column()
  priority: number;

  @ManyToMany(type => Permission)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];

  @Column({ nullable: true })
  description: string;
}
