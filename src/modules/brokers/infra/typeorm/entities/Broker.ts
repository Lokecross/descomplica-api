import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brokers')
class Broker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sankhya_id: string;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  creci: string;

  @Column()
  creci_uf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Broker;
