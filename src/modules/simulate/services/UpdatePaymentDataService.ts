import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISimulatesRepository from '../repositories/ISimulatesRepository';
import Simulate from '../infra/typeorm/entities/Simulate';

interface IRequest {
  simulateId: string;
  notes: string;
  tax: string;
  period: string;
  deadline: string;
  type: string;
  price: string;
  input: string;
  value: string;
}

@injectable()
class UpdatePaymentDataService {
  constructor(
    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,
  ) {}

  public async execute({ simulateId, ...rest }: IRequest): Promise<Simulate> {
    const simulate = await this.simulatesRepository.findById(simulateId);

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    Object.assign(simulate, rest);

    await this.simulatesRepository.save(simulate);

    return simulate;
  }
}

export default UpdatePaymentDataService;
