import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import Attendance from '@modules/attendances/infra/typeorm/entities/Attendance';
import Lot from '@modules/lots/infra/typeorm/entities/Lot';
import Payer from './Payer';
import Comission from './Comission';

const tuple = <T extends string[]>(...args: T) => args;
export const statusSimulateOptions = tuple('in_progress', 'sent', 'refused');
export type StatusSimulateOptions = typeof statusSimulateOptions[number];

@Entity('simulates')
class Simulate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  attendanceId: string;

  @ManyToOne(() => Attendance, attendance => attendance.simulates)
  attendance: Attendance;

  @Column({ nullable: true })
  lotId: string;

  @ManyToOne(() => Lot, lot => lot.simulates)
  lot: Lot;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  tax: string;

  @Column({ nullable: true })
  period: string;

  @Column({ nullable: true })
  deadline: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  input: string;

  @Column({ nullable: true })
  value: string;

  @Column({ nullable: true })
  reservationId: string;

  @Column({ nullable: true })
  contractId: string;

  @Column({ nullable: true })
  status: 'in_progress' | 'sent' | 'refused';

  @OneToMany(() => Payer, payer => payer.simulate)
  payers: Payer[];

  @OneToMany(() => Comission, comission => comission.simulate)
  comissions: Comission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Simulate;
