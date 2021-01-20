import { injectable, inject } from 'tsyringe';

import Audition from '../infra/typeorm/entities/Audition';
import IAuditionsRepository from '../repositories/IAuditionsRepository';

@injectable()
class ListAuditionsService {
  constructor(
    @inject('AuditionsRepository')
    private auditionsRepository: IAuditionsRepository,
  ) {}

  public async execute(): Promise<Audition[]> {
    const auditions = await this.auditionsRepository.list();

    return auditions;
  }
}

export default ListAuditionsService;
