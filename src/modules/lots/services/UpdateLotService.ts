import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Lot from '../infra/typeorm/entities/Lot';

import ILotsRepository from '../repositories/ILotsRepository';

interface IRequest {
  id: string;
  enterpriseId: string;
  sankhya_id: string;
  enterprise_sankhya_id: string;
  name: string;
  price: string;
  area: string;
  address: string;
  block: string;
  initials_situation: string;
  situation: string;
  x: string;
  y: string;
  config_right: string;
  config_left: string;
  config_front: string;
  config_back: string;
  config_chamfer: string;
  config_variant: string;
  measure_front: string;
  measure_back: string;
  measure_right: string;
  measure_left: string;
  measure_chamfer: string;
  measure_variant: string;
  reservation_timer: string;
  note: string;
}

@injectable()
class UpdateLotService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,
  ) {}

  public async execute({ id, ...restData }: IRequest): Promise<Lot> {
    const lot = await this.lotsRepository.findById(id);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    Object.assign(lot, restData);

    const updatedLot = await this.lotsRepository.save(lot);

    return updatedLot;
  }
}

export default UpdateLotService;
