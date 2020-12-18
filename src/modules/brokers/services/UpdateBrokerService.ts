import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Broker from '../infra/typeorm/entities/Broker';

import IBrokersRepository from '../repositories/IBrokersRepository';

interface IRequest {
  id: string;
  sankhya_id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  creci_uf: string;
}

@injectable()
class UpdateBrokerService {
  constructor(
    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,
  ) {}

  public async execute({ id, ...restData }: IRequest): Promise<Broker> {
    const broker = await this.brokersRepository.findById(id);

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    Object.assign(broker, restData);

    const updatedBroker = await this.brokersRepository.save(broker);

    return updatedBroker;
  }
}

export default UpdateBrokerService;
