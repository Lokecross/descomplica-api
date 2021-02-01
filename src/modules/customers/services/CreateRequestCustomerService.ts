import { injectable, inject } from 'tsyringe';

import RequestCustomer from '../infra/typeorm/entities/RequestCustomer';
import IRequestCustomersRepository from '../repositories/IRequestCustomersRepository';

interface IRequest {
  user_id: string;
  customerId: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

@injectable()
class CreateRequestCustomerService {
  constructor(
    @inject('RequestCustomersRepository')
    private requestCustomersRepository: IRequestCustomersRepository,
  ) {}

  public async execute({
    user_id,
    ...reqData
  }: IRequest): Promise<RequestCustomer> {
    const requestCustomer = await this.requestCustomersRepository.create({
      ...reqData,
      status: 'pending',
      userId: user_id,
    });

    return requestCustomer;
  }
}

export default CreateRequestCustomerService;
