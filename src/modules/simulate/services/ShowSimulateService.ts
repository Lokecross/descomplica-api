import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISimulatesRepository from '../repositories/ISimulatesRepository';
import Simulate from '../infra/typeorm/entities/Simulate';

interface IRequest {
  simulateId: string;
}

@injectable()
class ShowSimulateService {
  constructor(
    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,
  ) {}

  public async execute({ simulateId }: IRequest): Promise<Simulate> {
    const simulate = await this.simulatesRepository.findByIdWithRelations(
      simulateId,
    );

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    return simulate;
  }
}

export default ShowSimulateService;
