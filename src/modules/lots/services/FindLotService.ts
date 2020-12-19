import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Lot from '../infra/typeorm/entities/Lot';

import ILotsRepository from '../repositories/ILotsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindLotService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Lot> {
    const lot = await this.lotsRepository.findById(id);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    return lot;
  }
}

export default FindLotService;
