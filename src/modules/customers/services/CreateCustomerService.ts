import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  document: string;
  name: string;
  email: string;
  phone: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.create(reqData);

    return customer;
  }
}

export default CreateCustomerService;
