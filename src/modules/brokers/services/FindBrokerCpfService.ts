import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Broker from '../infra/typeorm/entities/Broker';

import IBrokersRepository from '../repositories/IBrokersRepository';

interface IRequest {
  cpf: string;
}

@injectable()
class FindBrokerCpfService {
  constructor(
    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,
  ) {}

  public async execute({ cpf }: IRequest): Promise<Broker> {
    const broker = await this.brokersRepository.findByCpf(cpf);

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    return broker;
  }
}

export default FindBrokerCpfService;
