import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Attendance from '@modules/attendances/infra/typeorm/entities/Attendance';
import RequestCustomer from './RequestCustomer';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Attendance, attendance => attendance.customer)
  attendances: Attendance[];

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @OneToMany(() => RequestCustomer, request => request.customer)
  requestCustomers: RequestCustomer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
