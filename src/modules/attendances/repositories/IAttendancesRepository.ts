import Attendance from '../infra/typeorm/entities/Attendance';
import ICreateAttendanceDTO from '../dtos/ICreateAttendanceDTO';

export default interface IAttendancesRepository {
  create(data: ICreateAttendanceDTO): Promise<Attendance>;
  findById(id: string): Promise<Attendance | undefined>;
  list(): Promise<Attendance[]>;
  listByEnterprise(enterpriseId: string): Promise<Attendance[]>;
  save(attendance: Attendance): Promise<Attendance>;
}
