import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPayersRepository from '../repositories/IPayersRepository';
import Payer from '../infra/typeorm/entities/Payer';

interface IRequest {
  payerId: string;
}

@injectable()
class ShowPayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute({ payerId }: IRequest): Promise<Payer> {
    const payer = await this.payersRepository.findById(payerId);

    if (!payer) {
      throw new AppError('Payer not found', 404);
    }

    return payer;
  }
}

export default ShowPayerService;
