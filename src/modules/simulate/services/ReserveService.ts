import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';
import ISimulatesRepository from '../repositories/ISimulatesRepository';

interface IRequest {
  simulateId: string;
}

@injectable()
class CreateReservetionService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,

    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,
  ) {}

  public async execute({ simulateId }: IRequest): Promise<any> {
    const simulateRelations = await this.simulatesRepository.findByIdWithRelations(
      simulateId,
    );
    const simulate = await this.simulatesRepository.findById(simulateId);

    if (!simulateRelations) {
      throw new AppError('Simulate not found', 404);
    }

    const { data, error } = await this.sankhyaProvider.reserve({
      corretor_id: simulateRelations.attendance.broker.sankhya_id,
      document: simulateRelations.attendance.customer.document,
      email: simulateRelations.attendance.customer.email,
      name: simulateRelations.attendance.customer.name,
      phone: simulateRelations.attendance.customer.phone,
      notes: simulateRelations.notes,
      lot_id: simulateRelations.lot.sankhya_id,
    });

    if (error) {
      throw new AppError(error);
    }

    simulate.reservationId = data.reservation_id;

    await this.simulatesRepository.save(simulate);

    return simulate;
  }
}

export default CreateReservetionService;
