import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Lot from '@modules/lots/infra/typeorm/entities/Lot';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enterprise;
