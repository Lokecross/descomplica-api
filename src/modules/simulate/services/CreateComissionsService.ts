import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IComissionsRepository from '../repositories/IComissionsRepository';
import ISimulatesRepository from '../repositories/ISimulatesRepository';

interface IRequest {
  simulateId: string;
  comissions: Array<{
    type: string;
    venc: string;
    price: string;
  }>;
}

@injectable()
class CreateComissionsService {
  constructor(
    @inject('ComissionsRepository')
    private comissionsRepository: IComissionsRepository,

    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,
  ) {}

  public async execute({ simulateId, comissions }: IRequest): Promise<any> {
    const simulate = await this.simulatesRepository.findById(simulateId);

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    comissions.forEach(item => {
      const doEach = async () => {
        await this.comissionsRepository.create({
          simulateId,
          ...item,
        });
      };

      doEach();
    });

    return {
      ok: true,
    };
  }
}

export default CreateComissionsService;
