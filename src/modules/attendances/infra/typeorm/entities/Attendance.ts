import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Lot from '@modules/lots/infra/typeorm/entities/Lot';
import Broker from '@modules/brokers/infra/typeorm/entities/Broker';

@Entity('attendances')
class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note: string;

  @Column()
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.attendances)
  customer: Customer;

  @Column()
  lotId: string;

  @ManyToOne(() => Lot, lot => lot.attendances)
  lot: Lot;

  @Column()
  brokerId: string;

  @ManyToOne(() => Broker, broker => broker.attendances)
  broker: Broker;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Attendance;
