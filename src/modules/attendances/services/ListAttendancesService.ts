import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
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

    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Attendance[]> {
    const user = await this.usersRepository.findById(userId);

    if (user.role === 'broker') {
      const attendancesByBroker = await this.attendancesRepository.listByBroker(
        user.brokerId,
      );

      return attendancesByBroker;
    }

    if (user.role === 'supervisor') {
      const attendances = await this.attendancesRepository.list();

      const team = await this.teamsRepository.findBySupervisor(user.id);

      const usersByTeam = await this.usersRepository.listByTeam(team.id);

      const usersIdByTeam = usersByTeam.map(item => item.brokerId);

      const attendancesSupervisor = attendances.filter(item => {
        return (
          usersIdByTeam.some(brokerId => brokerId === item.brokerId) ||
          item.brokerId === user.brokerId
        );
      });

      return attendancesSupervisor;
    }

    const attendances = await this.attendancesRepository.list();

    return attendances;
  }
}

export default ListAttendancesService;
