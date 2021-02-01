import { injectable, inject } from 'tsyringe';

import RequestCustomer from '../infra/typeorm/entities/RequestCustomer';
import IRequestCustomersRepository from '../repositories/IRequestCustomersRepository';

@injectable()
class ListRequestCustomerService {
  constructor(
    @inject('RequestCustomersRepository')
    private requestCustomersRepository: IRequestCustomersRepository,
  ) {}

  public async execute(): Promise<RequestCustomer[]> {
    const requestCustomers = await this.requestCustomersRepository.list();

    return requestCustomers;
  }
}

export default ListRequestCustomerService;
