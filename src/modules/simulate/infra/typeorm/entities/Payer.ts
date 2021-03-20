import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Simulate from './Simulate';

@Entity('payers')
class Payer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  simulateId: string;

  @ManyToOne(() => Simulate, simulate => simulate.payers)
  simulate: Simulate;

  @Column({ type: 'bool', nullable: true })
  responsible: boolean;

  @Column({ nullable: true })
  sankhyaPartnerId: string;

  @Column({ nullable: true })
  document: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  village: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  rg: string;

  @Column({ nullable: true })
  rg_emission: string;

  @Column({ nullable: true })
  rg_agency: string;

  @Column({ nullable: true })
  birth: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  father: string;

  @Column({ nullable: true })
  mother: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ nullable: true })
  spouse_name: string;

  @Column({ nullable: true })
  spouse_rg: string;

  @Column({ nullable: true })
  spouse_cpf: string;

  @Column({ nullable: true })
  spouse_birth: string;

  @Column({ nullable: true })
  spouse_email: string;

  @Column({ nullable: true })
  rg_b64: string;

  @Column({ nullable: true })
  cpf_b64: string;

  @Column({ nullable: true })
  address_b64: string;

  @Column({ nullable: true })
  marriage_b64: string;

  @Column({ nullable: true })
  spouse_rg_b64: string;

  @Column({ nullable: true })
  spouse_cpf_b64: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Payer;
