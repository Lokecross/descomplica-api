import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  customer_id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id }: IRequest): Promise<void> {
    const bank = await this.customersRepository.findById(customer_id);

    if (!bank) {
      throw new AppError('Bank not found', 404);
    }

    await this.customersRepository.delete(bank);
  }
}

export default DeleteCustomerService;
