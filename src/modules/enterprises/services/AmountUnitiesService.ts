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
      enterprises: enterprises.filter(item => {
        if (item.lots) {
          if (item.lots.length === 0) {
            return false;
          }

          const indexLotAvaiable = item.lots.findIndex(
            itemLot => itemLot.initials_situation === 'DI',
          );

          if (indexLotAvaiable === -1) {
            return false;
          }

          return true;
        }

        return false;
      }).length,
      lots_avaiable: lots.filter(itemLot => itemLot.initials_situation === 'DI')
        .length,
      lots_sold: lots.filter(itemLot => itemLot.initials_situation === 'VE')
        .length,
    };
  }
}

export default AmountUnitiesService;
