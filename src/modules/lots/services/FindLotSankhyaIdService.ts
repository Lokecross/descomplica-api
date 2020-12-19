import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Lot from '../infra/typeorm/entities/Lot';

import ILotsRepository from '../repositories/ILotsRepository';

interface IRequest {
  sankhya_id: string;
}

@injectable()
class FindLotSankhyaIdService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute({ sankhya_id }: IRequest): Promise<Lot> {
    const lot = await this.lotsRepository.findBySankhyaId(sankhya_id);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    return lot;
  }
}

export default FindLotSankhyaIdService;
