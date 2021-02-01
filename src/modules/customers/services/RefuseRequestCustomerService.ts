import { injectable, inject } from 'tsyringe';

import RequestCustomer from '../infra/typeorm/entities/RequestCustomer';
import IRequestCustomersRepository from '../repositories/IRequestCustomersRepository';

interface IRequest {
  requestCustomerId: string;
  notes: string;
}

@injectable()
class RefuseRequestCustomerService {
  constructor(
    @inject('RequestCustomersRepository')
    private requestCustomersRepository: IRequestCustomersRepository,
  ) {}

  public async execute({
    notes,
    requestCustomerId,
  }: IRequest): Promise<RequestCustomer> {
    const requestCustomer = await this.requestCustomersRepository.findById(
      requestCustomerId,
    );

    requestCustomer.notes = notes;
    requestCustomer.status = 'refused';

    await this.requestCustomersRepository.save(requestCustomer);

    return requestCustomer;
  }
}

export default RefuseRequestCustomerService;
