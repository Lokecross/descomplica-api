import { injectable, inject } from 'tsyringe';

import Lot from '../infra/typeorm/entities/Lot';

import ILotsRepository from '../repositories/ILotsRepository';

@injectable()
class ListLotsService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute(): Promise<Lot[]> {
    const lots = await this.lotsRepository.list();

    return lots;
  }
}

export default ListLotsService;
