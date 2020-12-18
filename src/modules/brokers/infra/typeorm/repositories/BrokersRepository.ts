import { getRepository, Repository } from 'typeorm';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import ICreateBrokerDTO from '@modules/brokers/dtos/ICreateBrokerDTO';

import Broker from '../entities/Broker';

class BrokersRepository implements IBrokersRepository {
  private ormRepository: Repository<Broker>;

  constructor() {
    this.ormRepository = getRepository(Broker);
  }

  public async create(reqData: ICreateBrokerDTO): Promise<Broker> {
    const broker = this.ormRepository.create(reqData);

    await this.ormRepository.save(broker);

    return broker;
  }

  public async findById(id: string): Promise<Broker | undefined> {
    const broker = this.ormRepository.findOne(id);

    return broker;
  }

  public async findByCpf(cpf: string): Promise<Broker | undefined> {
    const broker = this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return broker;
  }

  public async list(): Promise<Broker[]> {
    const brokers = await this.ormRepository.find();

    return brokers;
  }

  public async save(broker: Broker): Promise<Broker> {
    return this.ormRepository.save(broker);
  }
}

export default BrokersRepository;
