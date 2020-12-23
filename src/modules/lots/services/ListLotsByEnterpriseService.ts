import { injectable, inject } from 'tsyringe';

import Lot from '../infra/typeorm/entities/Lot';

import ILotsRepository from '../repositories/ILotsRepository';

interface IRequest {
  enterprise_id: string;
}
@injectable()
class ListLotsByEnterpriseService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute({ enterprise_id }: IRequest): Promise<Lot[]> {
    const lots = await this.lotsRepository.listByEnterprise(enterprise_id);

    return lots;
  }
}

export default ListLotsByEnterpriseService;
