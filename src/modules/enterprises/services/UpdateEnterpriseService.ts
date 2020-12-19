import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Enterprise from '../infra/typeorm/entities/Enterprise';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  id: string;
  sankhya_id: string;
  name: string;
  name_abbreviated: string;
  city: string;
  uf: string;
  village: string;
  reservation_amount: string;
  reservation_timer: string;
}

@injectable()
class UpdateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute({ id, ...restData }: IRequest): Promise<Enterprise> {
    const enterprise = await this.enterprisesRepository.findById(id);

    if (!enterprise) {
      throw new AppError('Enterprise not found', 404);
    }

    Object.assign(enterprise, restData);

    const updatedEnterprise = await this.enterprisesRepository.save(enterprise);

    return updatedEnterprise;
  }
}

export default UpdateEnterpriseService;
