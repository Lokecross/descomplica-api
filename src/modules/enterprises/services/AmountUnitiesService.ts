import { injectable, inject } from 'tsyringe';

import ILotsRepository from '@modules/lots/repositories/ILotsRepository';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IResponse {
  enterprises: number;
  lots_avaiable: number;
  lots_sold: number;
}

@injectable()
class AmountUnitiesService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const enterprises = await this.enterprisesRepository.list();

    const lots = await this.lotsRepository.list();

    return {
      enterprises: enterprises.length,
      lots_avaiable: lots.filter(itemLot => itemLot.initials_situation === 'DI')
        .length,
      lots_sold: lots.filter(itemLot => itemLot.initials_situation === 'VE')
        .length,
    };
  }
}

export default AmountUnitiesService;
