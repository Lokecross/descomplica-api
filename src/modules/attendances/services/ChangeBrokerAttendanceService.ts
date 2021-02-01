import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  attendance_id: string;
  userId: string;
}

@injectable()
class ChangeBrokerAttendanceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({
    userId,
    attendance_id,
  }: IRequest): Promise<Attendance> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const attendance = await this.attendancesRepository.findById(attendance_id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    attendance.brokerId = user.brokerId;

    const updatedAttendace = await this.attendancesRepository.save(attendance);

    return updatedAttendace;
  }
}

export default ChangeBrokerAttendanceService;
