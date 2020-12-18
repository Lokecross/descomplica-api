import Broker from '../infra/typeorm/entities/Broker';
import ICreateBrokerDTO from '../dtos/ICreateBrokerDTO';

export default interface IBrokersRepository {
  create(data: ICreateBrokerDTO): Promise<Broker>;
  findById(id: string): Promise<Broker | undefined>;
  findByCpf(cpf: string): Promise<Broker | undefined>;
  list(): Promise<Broker[]>;
  save(broker: Broker): Promise<Broker>;
}
