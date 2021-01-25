import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Broker from '@modules/brokers/infra/typeorm/entities/Broker';

const tuple = <T extends string[]>(...args: T) => args;
export const roleOptions = tuple('supervisor', 'manager', 'broker');
export type RoleOptions = typeof roleOptions[number];

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column({ nullable: true })
  onesignal_id?: string;

  @Column()
  brokerId: string;

  @OneToOne(() => Broker)
  @JoinColumn()
  broker: Broker;

  @Column({ nullable: true })
  role: RoleOptions;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
