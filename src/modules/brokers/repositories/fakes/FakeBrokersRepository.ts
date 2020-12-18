import { uuid } from 'uuidv4';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import ICreateBrokerDTO from '@modules/brokers/dtos/ICreateBrokerDTO';

import Broker from '../../infra/typeorm/entities/Broker';

class FakeBrokersRepository implements IBrokersRepository {
  private brokers: Broker[] = [];

  public async create(reqData: ICreateBrokerDTO): Promise<Broker> {
    const broker = new Broker();

    Object.assign(broker, { id: uuid(), ...reqData });

    this.brokers.push(broker);

    return broker;
  }

  public async findById(id: string): Promise<Broker | undefined> {
    const findBroker = this.brokers.find(broker => broker.id === id);

    return findBroker;
  }

  public async findByCpf(cpf: string): Promise<Broker | undefined> {
    const findBroker = this.brokers.find(broker => broker.cpf === cpf);

    return findBroker;
  }

  public async list(): Promise<Broker[]> {
    return this.brokers;
  }

  public async save(broker: Broker): Promise<Broker> {
    const findIndex = this.brokers.findIndex(
      findBroker => findBroker.id === broker.id,
    );

    this.brokers[findIndex] = broker;

    return broker;
  }
}

export default FakeBrokersRepository;
