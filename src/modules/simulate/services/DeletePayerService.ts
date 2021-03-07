import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPayersRepository from '../repositories/IPayersRepository';

interface IRequest {
  payerId: string;
}

@injectable()
class DeletePayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute({ payerId }: IRequest): Promise<void> {
    const payer = await this.payersRepository.findById(payerId);

    if (!payer) {
      throw new AppError('Payer not found', 404);
    }

    await this.payersRepository.delete(payer);
  }
}

export default DeletePayerService;
