import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  customerId: string;
  lotId: string;
  brokerId: string;
  note: string;
}

@injectable()
class CreateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Attendance> {
    const attendance = await this.attendancesRepository.create(reqData);

    return attendance;
  }
}

export default CreateAttendanceService;
