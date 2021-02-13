import Simulate from '../infra/typeorm/entities/Simulate';
import ICreateSimulateDTO from '../dtos/ICreateSimulateDTO';

export default interface ISimulatesRepository {
  findById(id: string): Promise<Simulate | undefined>;
  findByIdWithRelations(id: string): Promise<Simulate | undefined>;
  list(): Promise<Simulate[]>;
  create(data: ICreateSimulateDTO): Promise<Simulate>;
  save(data: Simulate): Promise<Simulate>;
}
