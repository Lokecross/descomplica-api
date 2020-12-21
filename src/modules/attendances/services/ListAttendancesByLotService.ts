import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  lotId: string;
}

@injectable()
class ListAttendancesService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ lotId }: IRequest): Promise<Attendance[]> {
    const attendances = await this.attendancesRepository.listByLot(lotId);

    return attendances;
  }
}

export default ListAttendancesService;
