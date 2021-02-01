import RequestCustomer from '../infra/typeorm/entities/RequestCustomer';
import ICreateRequestCustomerDTO from '../dtos/ICreateRequestCustomerDTO';

export default interface IRequestCustomersRepository {
  findById(id: string): Promise<RequestCustomer | undefined>;
  create(data: ICreateRequestCustomerDTO): Promise<RequestCustomer>;
  delete(data: RequestCustomer): Promise<void>;
  list(): Promise<RequestCustomer[]>;
  save(data: RequestCustomer): Promise<RequestCustomer>;
}
