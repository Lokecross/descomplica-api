import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import ILotsRepository from '@modules/lots/repositories/ILotsRepository';

import ISimulatesRepository from '../repositories/ISimulatesRepository';
import Simulate from '../infra/typeorm/entities/Simulate';

interface IRequest {
  lotId: string;
  attendanceId: string;
}

@injectable()
class CreateSimulateService {
  constructor(
    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,

    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ lotId, attendanceId }: IRequest): Promise<Simulate> {
    const lot = await this.lotsRepository.findById(lotId);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    const attendance = await this.attendancesRepository.findById(attendanceId);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    const simulate = await this.simulatesRepository.create({
      lotId: lot.id,
      attendanceId,
      status: 'in_progress',
    });

    return simulate;
  }
}

export default CreateSimulateService;
