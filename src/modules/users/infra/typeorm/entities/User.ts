import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Broker from '@modules/brokers/infra/typeorm/entities/Broker';
import Team from './Team';

const tuple = <T extends string[]>(...args: T) => args;
export const roleOptions = tuple('manager', 'supervisor', 'broker');
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
  role: 'manager' | 'supervisor' | 'broker';

  @OneToOne(() => Team, team => team.supervisor)
  supervisorTeam: Team;

  @Column({ nullable: true })
  teamId: string;

  @ManyToOne(() => Team, team => team.users)
  team: Team;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
