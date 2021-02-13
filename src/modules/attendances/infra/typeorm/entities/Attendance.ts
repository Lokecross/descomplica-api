import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Lot from '@modules/lots/infra/typeorm/entities/Lot';
import Broker from '@modules/brokers/infra/typeorm/entities/Broker';
import Simulate from '@modules/simulate/infra/typeorm/entities/Simulate';

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

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => Simulate, simulate => simulate.attendance)
  simulates: Simulate[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Attendance;
