import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Simulate from './Simulate';

@Entity('comissions')
class Comission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  simulateId: string;

  @ManyToOne(() => Simulate, simulate => simulate.comissions)
  simulate: Simulate;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  venc: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comission;
