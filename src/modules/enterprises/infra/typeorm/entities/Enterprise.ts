import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Lot from '@modules/lots/infra/typeorm/entities/Lot';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('enterprises')
class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sankhya_id: string;

  @Column()
  name: string;

  @Column()
  name_abbreviated: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  village: string;

  @Column()
  reservation_amount: string;

  @Column()
  reservation_timer: string;

  @OneToMany(() => Lot, lot => lot.enterprise)
  lots: Lot[];

  @ManyToMany(() => User, user => user.enterprises)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enterprise;
