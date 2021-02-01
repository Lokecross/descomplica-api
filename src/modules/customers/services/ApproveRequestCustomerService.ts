import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import IRequestCustomersRepository from '../repositories/IRequestCustomersRepository';

interface IRequest {
  requestCustomerId: string;
}

@injectable()
class CreateRequestCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('RequestCustomersRepository')
    private requestCustomersRepository: IRequestCustomersRepository,
  ) {}

  public async execute({ requestCustomerId }: IRequest): Promise<Customer> {
    const requestCustomer = await this.requestCustomersRepository.findById(
      requestCustomerId,
    );

    const customer = await this.customersRepository.findById(
      requestCustomer.customerId,
    );

    customer.name = requestCustomer.name;
    customer.email = requestCustomer.email;
    customer.phone = requestCustomer.phone;
    customer.document = requestCustomer.document;
    customer.gender = requestCustomer.gender;

    await this.customersRepository.save(customer);

    await this.requestCustomersRepository.delete(requestCustomer);

    return customer;
  }
}

export default CreateRequestCustomerService;
