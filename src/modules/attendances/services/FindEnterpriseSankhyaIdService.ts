import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Enterprise from '../infra/typeorm/entities/Enterprise';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  sankhya_id: string;
}

@injectable()
class FindEnterpriseSankhyaIdService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({ sankhya_id }: IRequest): Promise<Enterprise> {
    const enterprise = await this.enterprisesRepository.findBySankhyaId(
      sankhya_id,
    );

    if (!enterprise) {
      throw new AppError('Enterprise not found', 404);
    }

    return enterprise;
  }
}

export default FindEnterpriseSankhyaIdService;
