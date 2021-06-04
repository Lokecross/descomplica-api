import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';
import ILotsRepository from '@modules/lots/repositories/ILotsRepository';

import ISimulatesRepository from '../repositories/ISimulatesRepository';

interface IRequest {
  simulateId: string;
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
  tabela: string;
  periodicidade: string;
  name: string;
  block: string;
  enterprise_name: string;
}

@injectable()
class SimulationService {
  constructor(
    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,

    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,

    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ simulateId }: IRequest): Promise<IResponse> {
    const simulate = await this.simulatesRepository.findByIdWithRelations(
      simulateId,
    );

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    const lot = await this.lotsRepository.findByIdWithRelations(simulate.lotId);

    const { data, error } = await this.sankhyaProvider.simulate(
      simulate.lot.sankhya_id,
    );

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

export default SimulationService;
