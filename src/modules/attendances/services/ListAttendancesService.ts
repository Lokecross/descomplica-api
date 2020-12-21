import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

@injectable()
class ListAttendancesService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute(): Promise<Attendance[]> {
    const attendances = await this.attendancesRepository.list();

    return attendances;
  }
}

export default ListAttendancesService;
