import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';

interface IRequest {
  user_id: string;
  first_date: string;
  readjustment: string;
  financed: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  lot_id: string;
  input: string;
  price: string;
  proposal: string;
  franquia: string;
  corretor: string;
  admin: string;
  input_venc: string;
  is_price: boolean;
  installments: string;
  period: string;
  installment: string;
  tax: string;
  is_financed: boolean;
  notes: string;
}

@injectable()
class CreateReservetionService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,
  ) {}

  public async execute({
    user_id,
    admin,
    corretor,
    document,
    email,
    financed,
    first_date,
    franquia,
    input,
    input_venc,
    installment,
    installments,
    is_financed,
    is_price,
    lot_id,
    name,
    period,
    phone,
    price,
    proposal,
    readjustment,
    tax,
    notes,
  }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(user_id);

    const reserve = await this.sankhyaProvider.reserve({
      corretor_id: user.broker.sankhya_id,
      document,
      email,
      lot_id,
      name,
      notes,
      phone,
    });

    if (reserve.error) {
      throw new AppError(reserve.error);
    }

    const contract = await this.sankhyaProvider.createContract({
      admin,
      corretor,
      corretor_id: user.broker.sankhya_id,
      financed,
      first_date,
      franquia,
      gerente_id:
        user.role === 'manager'
          ? user.broker.sankhya_id
          : (
              await this.brokersRepository.findById(
                user.team?.supervisor?.brokerId,
              )
            ).sankhya_id,
      input,
      input_venc,
      installment,
      installments,
      is_financed,
      is_price,
      lot_id,
      period,
      price,
      proposal,
      readjustment,
      reservation_id: reserve.data.reservation_id,
      supervisor_id:
        user.role === 'manager'
          ? user.broker.sankhya_id
          : (
              await this.brokersRepository.findById(
                user.team?.supervisor?.brokerId,
              )
            ).sankhya_id,
      tax,
    });

    if (contract.error) {
      throw new AppError(contract.error);
    }

    return {
      id: contract.data.contract_id,
    };
  }
}

export default CreateReservetionService;
