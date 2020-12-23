import { uuid } from 'uuidv4';

import ICustomersRepository from '../ICustomersRepository';
import ICreateCustomerDTO from '../../dtos/ICreateCustomerDTO';

import Customer from '../../infra/typeorm/entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);

    return findCustomer;
  }

  public async create(createData: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid() }, createData);

    this.customers.push(customer);

    return customer;
  }

  public async delete(customer: Customer): Promise<void> {
    this.customers = this.customers.filter(
      findCustomer => findCustomer.id !== customer.id,
    );
  }

  public async list(): Promise<Customer[]> {
    return this.customers;
  }

  public async listByEnterprise(enterpriseId: string): Promise<Customer[]> {
    return this.customers.filter(itemCustomer => {
      return (
        itemCustomer.attendances.findIndex(
          itemAttendance => itemAttendance.lot.enterpriseId === enterpriseId,
        ) !== -1
      );
    });
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }
}

export default CustomersRepository;
