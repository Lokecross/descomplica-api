import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Attendance> {
    const attendance = await this.attendancesRepository.findById(id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    return attendance;
  }
}

export default FindAttendanceService;
