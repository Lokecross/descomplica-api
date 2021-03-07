import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Payer from '../infra/typeorm/entities/Payer';
import IPayersRepository from '../repositories/IPayersRepository';

interface IRequest {
  payerId: string;
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
class UpdatePayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute({ payerId, ...rest }: IRequest): Promise<Payer> {
    const payer = await this.payersRepository.findById(payerId);

    if (!payer) {
      throw new AppError('Payer not found', 404);
    }

    Object.assign(payer, rest);

    await this.payersRepository.save(payer);

    return payer;
  }
}

export default UpdatePayerService;
