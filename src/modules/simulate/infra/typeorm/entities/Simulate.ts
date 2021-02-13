import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Attendance from '@modules/attendances/infra/typeorm/entities/Attendance';
import Lot from '@modules/lots/infra/typeorm/entities/Lot';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Simulate;
