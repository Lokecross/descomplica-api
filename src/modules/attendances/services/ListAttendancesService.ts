import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListAttendancesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Attendance[]> {
    const user = await this.usersRepository.findById(userId);

    if (user.role === 'broker') {
      const attendancesByBroker = await this.attendancesRepository.listByBroker(
        user.brokerId,
      );

      return attendancesByBroker;
    }

    const attendances = await this.attendancesRepository.list();

    return attendances;
  }
}

export default ListAttendancesService;
