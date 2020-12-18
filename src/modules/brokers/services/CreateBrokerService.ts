import { injectable, inject } from 'tsyringe';

import Broker from '../infra/typeorm/entities/Broker';

import IBrokersRepository from '../repositories/IBrokersRepository';

interface IRequest {
  sankhya_id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  creci_uf: string;
}

@injectable()
class CreateBrokerService {
  constructor(
    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Broker> {
    const broker = await this.brokersRepository.create(reqData);

    return broker;
  }
}

export default CreateBrokerService;
