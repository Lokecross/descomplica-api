import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IComissionsRepository from '../repositories/IComissionsRepository';
import ISimulatesRepository from '../repositories/ISimulatesRepository';

interface IRequest {
  simulateId: string;
}

@injectable()
class DeleteComissionsService {
  constructor(
    @inject('ComissionsRepository')
    private comissionsRepository: IComissionsRepository,

    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,
  ) {}

  public async execute({ simulateId }: IRequest): Promise<any> {
    const simulate = await this.simulatesRepository.findByIdWithRelations(
      simulateId,
    );

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    simulate.comissions.forEach(item => {
      const doEach = async () => {
        await this.comissionsRepository.delete(item);
      };

      doEach();
    });

    return {
      ok: true,
    };
  }
}

export default DeleteComissionsService;
