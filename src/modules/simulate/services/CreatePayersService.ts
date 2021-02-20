import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISimulatesRepository from '../repositories/ISimulatesRepository';
import Payer from '../infra/typeorm/entities/Payer';
import IPayersRepository from '../repositories/IPayersRepository';

interface IRequest {
  simulateId: string;
  responsible: boolean;
  document: string;
  name: string;
  village: string;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
  email: string;
  sex: string;
  rg: string;
  rg_emission: string;
  rg_agency: string;
  birth: string;
  phone: string;
  father: string;
  mother: string;
  profession: string;
  marital_status: string;
  spouse_name: string;
  spouse_rg: string;
  spouse_cpf: string;
  spouse_birth: string;
  spouse_email: string;
  rg_b64: string;
  cpf_b64: string;
  address_b64: string;
  marriage_b64: string;
  spouse_rg_b64: string;
  spouse_cpf_b64: string;
}

@injectable()
class CreatePayersService {
  constructor(
    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,

    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute({ simulateId, ...rest }: IRequest): Promise<Payer> {
    const simulate = await this.simulatesRepository.findById(simulateId);

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    const payer = await this.payersRepository.create({
      simulateId,
      ...rest,
    });

    return payer;
  }
}

export default CreatePayersService;
