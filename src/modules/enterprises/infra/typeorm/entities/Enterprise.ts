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

import { Exclude, Expose } from 'class-transformer';

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
  @Exclude()
  lots: Lot[];

  @ManyToMany(() => User, user => user.enterprises)
  @JoinTable()
  users: User[];

  @Expose({ name: 'hasAvaiableLot' })
  getAvaiableLot(): boolean {
    if (this.lots) {
      if (this.lots.length === 0) {
        return false;
      }

      const indexLotAvaiable = this.lots.findIndex(
        item => item.initials_situation === 'DI',
      );

      if (indexLotAvaiable === -1) {
        return false;
      }

      return true;
    }

    return false;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enterprise;
