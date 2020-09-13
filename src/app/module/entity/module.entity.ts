import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
