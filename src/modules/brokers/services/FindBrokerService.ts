import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Broker from '../infra/typeorm/entities/Broker';

import IBrokersRepository from '../repositories/IBrokersRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindBrokerService {
  constructor(
    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Broker> {
    const broker = await this.brokersRepository.findById(id);

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    return broker;
  }
}

export default FindBrokerService;
