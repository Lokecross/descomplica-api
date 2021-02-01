import { getRepository, Repository } from 'typeorm';

import IRequestCustomersRepository from '@modules/customers/repositories/IRequestCustomersRepository';
import ICreateRequestCustomerDTO from '@modules/customers/dtos/ICreateRequestCustomerDTO';

import RequestCustomer from '../entities/RequestCustomer';

class RequestCustomersRepository implements IRequestCustomersRepository {
  private ormRepository: Repository<RequestCustomer>;

  constructor() {
    this.ormRepository = getRepository(RequestCustomer);
  }

  public async findById(id: string): Promise<RequestCustomer | undefined> {
    const requestCustomer = await this.ormRepository.findOne(id);

    return requestCustomer;
  }

  public async create(
    createData: ICreateRequestCustomerDTO,
  ): Promise<RequestCustomer> {
    const requestCustomer = this.ormRepository.create(createData);

    await this.ormRepository.save(requestCustomer);

    return requestCustomer;
  }

  public async list(): Promise<RequestCustomer[]> {
    const requestCustomers = await this.ormRepository.find({
      relations: ['customer'],
    });

    return requestCustomers;
  }

  public async delete(customer: RequestCustomer): Promise<void> {
    await this.ormRepository.delete({ id: customer.id });
  }

  public async save(customer: RequestCustomer): Promise<RequestCustomer> {
    return this.ormRepository.save(customer);
  }
}

export default RequestCustomersRepository;
