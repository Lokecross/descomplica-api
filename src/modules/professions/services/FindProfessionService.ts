import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profession from '../infra/typeorm/entities/Profession';

import IProfessionsRepository from '../repositories/IProfessionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindProfessionService {
  constructor(
    @inject('ProfessionsRepository')
    private professionsRepository: IProfessionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Profession> {
    const profession = await this.professionsRepository.findById(id);

    if (!profession) {
      throw new AppError('Profession not found', 404);
    }

    return profession;
  }
}

export default FindProfessionService;
