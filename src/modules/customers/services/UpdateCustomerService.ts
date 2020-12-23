import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  customer_id: string;
  document?: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    customer_id,
    ...reqData
  }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    Object.assign(customer, reqData);

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
