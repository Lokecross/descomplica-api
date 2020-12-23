import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne(id);

    return customer;
  }

  public async create(createData: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(createData);

    await this.ormRepository.save(customer);

    return customer;
  }

  public async list(): Promise<Customer[]> {
    const customers = await this.ormRepository
      .createQueryBuilder('customers')
      .innerJoinAndSelect('customers.attendances', 'attendances')
      .innerJoinAndSelect('attendances.lot', 'lots')
      .innerJoinAndSelect('lots.enterprise', 'enterprises')
      .getMany();

    return customers;
  }

  public async listByEnterprise(enterpriseId: string): Promise<Customer[]> {
    const customers = await this.ormRepository
      .createQueryBuilder('customers')
      .innerJoinAndSelect('customers.attendances', 'attendances')
      .innerJoinAndSelect('attendances.lot', 'lots')
      .innerJoinAndSelect('lots.enterprise', 'enterprises')
      .where('lots.enterpriseId = :enterpriseId', {
        enterpriseId,
      })
      .getMany();

    return customers;
  }

  public async delete(customer: Customer): Promise<void> {
    await this.ormRepository.delete({ id: customer.id });
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
}

export default CustomersRepository;
