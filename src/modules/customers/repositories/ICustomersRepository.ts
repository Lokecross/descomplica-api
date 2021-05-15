import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByDocument(document: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
  list(): Promise<Customer[]>;
  listByEnterprise(enterpriseId: string): Promise<Customer[]>;
  listByBroker(brokerId: string): Promise<Customer[]>;
  listBySupervisor(supervisorId: string): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
}
