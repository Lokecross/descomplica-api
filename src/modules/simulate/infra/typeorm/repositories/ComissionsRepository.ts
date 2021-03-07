import { getRepository, Repository } from 'typeorm';

import IComissionsRepository from '@modules/simulate/repositories/IComissionsRepository';
import ICreateComissionDTO from '@modules/simulate/dtos/ICreateComissionDTO';

import Comission from '../entities/Comission';

class ComissionsRepository implements IComissionsRepository {
  private ormRepository: Repository<Comission>;

  constructor() {
    this.ormRepository = getRepository(Comission);
  }

  public async findById(id: string): Promise<Comission | undefined> {
    const comission = await this.ormRepository.findOne(id);

    return comission;
  }

  public async list(): Promise<Comission[]> {
    const comissions = await this.ormRepository.find();

    return comissions;
  }

  public async delete(comission: Comission): Promise<void> {
    await this.ormRepository.delete({ id: comission.id });
  }

  public async create(data: ICreateComissionDTO): Promise<Comission> {
    const comission = this.ormRepository.create(data);

    await this.ormRepository.save(comission);

    return comission;
  }

  public async save(data: Comission): Promise<Comission> {
    return this.ormRepository.save(data);
  }
}

export default ComissionsRepository;
