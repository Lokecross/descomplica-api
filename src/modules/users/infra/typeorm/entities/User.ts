import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Broker from '@modules/brokers/infra/typeorm/entities/Broker';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
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
  role: 'supervisor' | 'manager' | 'broker';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
