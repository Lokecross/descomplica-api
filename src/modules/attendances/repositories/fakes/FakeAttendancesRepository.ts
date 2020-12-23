import { uuid } from 'uuidv4';

import IAttendancesRepository from '../IAttendancesRepository';
import ICreateAttendanceDTO from '../../dtos/ICreateAttendanceDTO';

import Attendance from '../../infra/typeorm/entities/Attendance';

class FakeAttendancesRepository implements IAttendancesRepository {
  private attendances: Attendance[] = [];

  public async create(reqData: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = new Attendance();

    Object.assign(attendance, { id: uuid(), ...reqData });

    this.attendances.push(attendance);

    return attendance;
  }

  public async findById(id: string): Promise<Attendance | undefined> {
    const findAttendance = this.attendances.find(
      attendance => attendance.id === id,
    );

    return findAttendance;
  }

  public async list(): Promise<Attendance[]> {
    return this.attendances;
  }

  public async listByEnterprise(enterpriseId: string): Promise<Attendance[]> {
    return this.attendances.filter(
      item => item.lot.enterpriseId === enterpriseId,
    );
  }

  public async save(attendance: Attendance): Promise<Attendance> {
    const findIndex = this.attendances.findIndex(
      findAttendance => findAttendance.id === attendance.id,
    );

    this.attendances[findIndex] = attendance;

    return attendance;
  }
}

export default FakeAttendancesRepository;
