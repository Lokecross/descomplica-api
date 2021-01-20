import { getRepository, Repository } from 'typeorm';

import IAuditionsRepository from '@modules/users/repositories/IAuditionsRepository';
import ICreateAuditionDTO from '@modules/users/dtos/ICreateAuditionDTO';

import Audition from '../entities/Audition';

class AuditionsRepository implements IAuditionsRepository {
  private ormRepository: Repository<Audition>;

  constructor() {
    this.ormRepository = getRepository(Audition);
  }

  public async list(): Promise<Audition[]> {
    const audition = await this.ormRepository.find();

    return audition;
  }

  public async create(data: ICreateAuditionDTO): Promise<Audition> {
    const audition = this.ormRepository.create(data);

    await this.ormRepository.save(audition);

    return audition;
  }
}

export default AuditionsRepository;
