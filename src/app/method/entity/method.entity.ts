import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Method {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
