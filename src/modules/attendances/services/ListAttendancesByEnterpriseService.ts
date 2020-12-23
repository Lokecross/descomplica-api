import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  enterpriseId: string;
}

@injectable()
class ListAttendancesByEnterpriseService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({ enterpriseId }: IRequest): Promise<Attendance[]> {
    const attendances = await this.attendancesRepository.listByEnterprise(
      enterpriseId,
    );

    return attendances;
  }
}

export default ListAttendancesByEnterpriseService;
