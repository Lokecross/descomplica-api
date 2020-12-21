import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profession from '../infra/typeorm/entities/Profession';

import IProfessionsRepository from '../repositories/IProfessionsRepository';

interface IRequest {
  sankhya_id: string;
}

@injectable()
class FindProfessionSankhyaIdService {
  constructor(
    @inject('ProfessionsRepository')
    private professionsRepository: IProfessionsRepository,
  ) {}

  public async execute({ sankhya_id }: IRequest): Promise<Profession> {
    const profession = await this.professionsRepository.findBySankhyaId(
      sankhya_id,
    );

    if (!profession) {
      throw new AppError('Profession not found', 404);
    }

    return profession;
  }
}

export default FindProfessionSankhyaIdService;
