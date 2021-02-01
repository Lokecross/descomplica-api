import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Customer from './Customer';

@Entity('request_customers')
class RequestCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.requestCustomers)
  customer: Customer;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.requestCustomers)
  user: User;

  @Column({ nullable: true })
  notes: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RequestCustomer;
