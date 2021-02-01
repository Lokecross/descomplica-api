import { uuid } from 'uuidv4';

import IRequestCustomersRepository from '../IRequestCustomersRepository';
import ICreateRequestCustomerDTO from '../../dtos/ICreateRequestCustomerDTO';

import RequestCustomer from '../../infra/typeorm/entities/RequestCustomer';

class FakeRequestCustomersRepository implements IRequestCustomersRepository {
  private requestCustomers: RequestCustomer[] = [];

  public async findById(id: string): Promise<RequestCustomer | undefined> {
    const requestCustomer = this.requestCustomers.find(item => item.id === id);

    return requestCustomer;
  }

  public async create(
    createData: ICreateRequestCustomerDTO,
  ): Promise<RequestCustomer> {
    const requestCustomer = new RequestCustomer();

    Object.assign(requestCustomer, { id: uuid() }, createData);

    this.requestCustomers.push(requestCustomer);

    return requestCustomer;
  }

  public async delete(customer: RequestCustomer): Promise<void> {
    this.requestCustomers = this.requestCustomers.filter(
      item => item.id !== customer.id,
    );
  }

  public async list(): Promise<RequestCustomer[]> {
    return this.requestCustomers;
  }

  public async save(
    requestCustomer: RequestCustomer,
  ): Promise<RequestCustomer> {
    const findIndex = this.requestCustomers.findIndex(
      item => item.id === requestCustomer.id,
    );

    this.requestCustomers[findIndex] = requestCustomer;

    return requestCustomer;
  }
}

export default FakeRequestCustomersRepository;
