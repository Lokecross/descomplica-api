import { uuid } from 'uuidv4';

import IAuditionsRepository from '../IAuditionsRepository';
import ICreateAuditionDTO from '../../dtos/ICreateAuditionDTO';

import Audition from '../../infra/typeorm/entities/Audition';

class FakeAuditionsRepository implements IAuditionsRepository {
  private auditions: Audition[] = [];

  public async list(): Promise<Audition[]> {
    return this.auditions;
  }

  public async create(data: ICreateAuditionDTO): Promise<Audition> {
    const audition = new Audition();

    Object.assign(audition, { id: uuid() }, data);

    this.auditions.push(audition);

    return audition;
  }
}

export default FakeAuditionsRepository;
