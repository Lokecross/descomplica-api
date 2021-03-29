import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  userId: string;
  enterpriseId: string;
}

@injectable()
class ListAttendancesByEnterpriseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({
    userId,
    enterpriseId,
  }: IRequest): Promise<Attendance[]> {
    const user = await this.usersRepository.findById(userId);

    if (user.role === 'broker') {
      const attendancesByBroker = await this.attendancesRepository.listByBrokerAndEnterprise(
        {
          brokerId: user.brokerId,
          enterpriseId,
        },
      );

      return attendancesByBroker;
    }

    const attendances = await this.attendancesRepository.listByEnterprise(
      enterpriseId,
    );

    return attendances;
  }
}

export default ListAttendancesByEnterpriseService;
