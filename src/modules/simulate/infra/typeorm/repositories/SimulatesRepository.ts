import { getRepository, Repository } from 'typeorm';

import ISimulatesRepository from '@modules/simulate/repositories/ISimulatesRepository';
import ICreateSimulateDTO from '@modules/simulate/dtos/ICreateSimulateDTO';

import Simulate from '../entities/Simulate';

class SimulatesRepository implements ISimulatesRepository {
  private ormRepository: Repository<Simulate>;

  constructor() {
    this.ormRepository = getRepository(Simulate);
  }

  public async findById(id: string): Promise<Simulate | undefined> {
    const simulate = await this.ormRepository.findOne(id);

    return simulate;
  }

  public async findByIdWithRelations(
    id: string,
  ): Promise<Simulate | undefined> {
    const simulate = await this.ormRepository.findOne(id, {
      relations: [
        'attendance',
        'lot',
        'payers',
        'comissions',
        'lot.enterprise',
        'attendance.customer',
        'attendance.broker',
      ],
    });

    return simulate;
  }

  public async findByIdWithPayersAndAttendance(
    id: string,
  ): Promise<Simulate | undefined> {
    const simulate = await this.ormRepository.findOne(id, {
      relations: ['payers', 'attendance', 'attendance.customer'],
    });

    return simulate;
  }

  public async list(): Promise<Simulate[]> {
    const simulates = await this.ormRepository.find({
      relations: ['attendance', 'lot'],
    });

    return simulates;
  }

  public async create(data: ICreateSimulateDTO): Promise<Simulate> {
    const simulate = this.ormRepository.create(data);

    await this.ormRepository.save(simulate);

    return simulate;
  }

  public async save(data: Simulate): Promise<Simulate> {
    return this.ormRepository.save(data);
  }
}

export default SimulatesRepository;
