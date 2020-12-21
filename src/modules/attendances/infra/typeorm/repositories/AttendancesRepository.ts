import { getRepository, Repository } from 'typeorm';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import ICreateAttendanceDTO from '@modules/attendances/dtos/ICreateAttendanceDTO';

import Attendance from '../entities/Attendance';

class AttendancesRepository implements IAttendancesRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  public async create(reqData: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = this.ormRepository.create(reqData);

    await this.ormRepository.save(attendance);

    return attendance;
  }

  public async findById(id: string): Promise<Attendance | undefined> {
    const attendance = this.ormRepository.findOne(id);

    return attendance;
  }

  public async list(): Promise<Attendance[]> {
    const attendances = await this.ormRepository.find();

    return attendances;
  }

  public async listByLot(lotId: string): Promise<Attendance[]> {
    const attendances = await this.ormRepository.find({
      where: {
        lotId,
      },
    });

    return attendances;
  }

  public async save(attendance: Attendance): Promise<Attendance> {
    return this.ormRepository.save(attendance);
  }
}

export default AttendancesRepository;
