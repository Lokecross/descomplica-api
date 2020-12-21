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
import Enterprise from '@modules/enterprises/infra/typeorm/entities/Enterprise';

@Entity('lots')
class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Attendance, attendance => attendance.lot)
  attendances: Attendance[];

  @Column()
  enterpriseId: string;

  @ManyToOne(() => Enterprise, enterprise => enterprise.lots)
  enterprise: Enterprise;

  @Column()
  sankhya_id: string;

  @Column()
  enterprise_sankhya_id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  area: string;

  @Column()
  address: string;

  @Column()
  block: string;

  @Column()
  initials_situation: string;

  @Column()
  situation: string;

  @Column({ nullable: true })
  x: string;

  @Column({ nullable: true })
  y: string;

  @Column({ nullable: true })
  config_right: string;

  @Column({ nullable: true })
  config_left: string;

  @Column({ nullable: true })
  config_front: string;

  @Column({ nullable: true })
  config_back: string;

  @Column({ nullable: true })
  config_chamfer: string;

  @Column({ nullable: true })
  config_variant: string;

  @Column({ nullable: true })
  measure_front: string;

  @Column({ nullable: true })
  measure_back: string;

  @Column({ nullable: true })
  measure_right: string;

  @Column({ nullable: true })
  measure_left: string;

  @Column({ nullable: true })
  measure_chamfer: string;

  @Column({ nullable: true })
  measure_variant: string;

  @Column()
  reservation_timer: string;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lot;
