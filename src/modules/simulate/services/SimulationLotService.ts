import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

import ILotsRepository from '@modules/lots/repositories/ILotsRepository';

interface IRequest {
  lotId: string;
}

interface IResponse {
  price: number;
  tax: number;
  qtdMinParc: number;
  qtdMaxParc: number;
  period: number;
  admin_price: number;
  admin_tax: number;
  broker_price: number;
  broker_tax: number;
  franchisee_price: number;
  franchisee_tax: number;
  name: string;
  block: string;
  enterprise_name: string;
}

@injectable()
class SimulationLotService {
  constructor(
    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,

    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ lotId }: IRequest): Promise<IResponse> {
    const lot = await this.lotsRepository.findByIdWithRelations(lotId);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    const { data, error } = await this.sankhyaProvider.simulate(lot.sankhya_id);

    if (error) {
      throw new AppError(error);
    }

    return {
      ...data,
      block: lot.block,
      name: lot.name,
      enterprise_name: lot.enterprise.name,
    };
  }
}

export default SimulationLotService;
