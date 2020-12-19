import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Enterprise from '../infra/typeorm/entities/Enterprise';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Enterprise> {
    const enterprise = await this.enterprisesRepository.findById(id);

    if (!enterprise) {
      throw new AppError('Enterprise not found', 404);
    }

    return enterprise;
  }
}

export default FindEnterpriseService;
