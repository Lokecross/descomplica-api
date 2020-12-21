import { injectable, inject } from 'tsyringe';

import Enterprise from '../infra/typeorm/entities/Enterprise';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
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
class CreateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Enterprise> {
    const enterprise = await this.enterprisesRepository.create(reqData);

    return enterprise;
  }
}

export default CreateEnterpriseService;
