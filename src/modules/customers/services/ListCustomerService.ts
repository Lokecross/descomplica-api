import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.list();

    return customers;
  }
}

export default ListCustomerService;
