import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  enterprise_id: string;
}

@injectable()
class ListCustomersByEnterpriseService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ enterprise_id }: IRequest): Promise<Customer[]> {
    const customers = await this.customersRepository.listByEnterprise(
      enterprise_id,
    );

    return customers;
  }
}

export default ListCustomersByEnterpriseService;
