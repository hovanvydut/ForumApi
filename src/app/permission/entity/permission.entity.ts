import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Method } from './../../method/entity/method.entity';
import { Module } from './../../module/entity/module.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Method)
  method: Method;

  @ManyToOne(type => Module)
  module: Module;
}
