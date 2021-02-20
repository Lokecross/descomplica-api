import { uuid } from 'uuidv4';

import ICreateSimulateDTO from '../../dtos/ICreateSimulateDTO';
import ISimulatesRepository from '../ISimulatesRepository';

import Simulate from '../../infra/typeorm/entities/Simulate';

class FakeSimulatesRepository implements ISimulatesRepository {
  private simulates: Simulate[] = [];

  public async findById(id: string): Promise<Simulate | undefined> {
    const simulate = this.simulates.find(item => item.id === id);

    return simulate;
  }

  public async findByIdWithRelations(
    id: string,
  ): Promise<Simulate | undefined> {
    const simulate = this.simulates.find(item => item.id === id);

    return simulate;
  }

  public async findByIdWithPayersAndAttendance(
    id: string,
  ): Promise<Simulate | undefined> {
    const simulate = this.simulates.find(item => item.id === id);

    return simulate;
  }

  public async list(): Promise<Simulate[]> {
    return this.simulates;
  }

  public async create(data: ICreateSimulateDTO): Promise<Simulate> {
    const simulate = new Simulate();

    Object.assign(simulate, { id: uuid() }, data);

    this.simulates.push(simulate);

    return simulate;
  }

  public async save(simulate: Simulate): Promise<Simulate> {
    const findIndex = this.simulates.findIndex(item => item.id === simulate.id);

    this.simulates[findIndex] = simulate;

    return simulate;
  }
}

export default FakeSimulatesRepository;
