import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  id: string;
  customerId: string;
  lotId: string;
  brokerId: string;
  note: string;
}

@injectable()
class UpdateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ id, ...restData }: IRequest): Promise<Attendance> {
    const attendance = await this.attendancesRepository.findById(id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    Object.assign(attendance, restData);

    const updatedAttendace = await this.attendancesRepository.save(attendance);

    return updatedAttendace;
  }
}

export default UpdateAttendanceService;
