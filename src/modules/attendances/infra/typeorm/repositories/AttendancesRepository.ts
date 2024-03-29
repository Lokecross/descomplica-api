import { getRepository, Repository } from 'typeorm';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import ICreateAttendanceDTO from '@modules/attendances/dtos/ICreateAttendanceDTO';

import IListByUserAndEnterprise from '@modules/attendances/dtos/IListByUserAndEnterprise';
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
    const attendances = await this.ormRepository.find({
      relations: ['customer', 'lot', 'lot.enterprise', 'simulates', 'broker'],
    });

    return attendances;
  }

  public async listByEnterprise(enterpriseId: string): Promise<Attendance[]> {
    const attendances = await this.ormRepository
      .createQueryBuilder('attendances')
      .innerJoinAndSelect('attendances.lot', 'lots')
      .innerJoinAndSelect('attendances.customer', 'customers')
      .innerJoinAndSelect('lots.enterprise', 'enterprises')
      .where('lots.enterpriseId = :enterpriseId', { enterpriseId })
      .getMany();

    return attendances;
  }

  public async listByBroker(brokerId: string): Promise<Attendance[]> {
    const attendances = await this.ormRepository.find({
      where: {
        brokerId,
      },
      relations: ['customer', 'lot', 'lot.enterprise', 'simulates', 'broker'],
    });

    return attendances;
  }

  public async listByBrokerAndEnterprise({
    brokerId,
    enterpriseId,
  }: IListByUserAndEnterprise): Promise<Attendance[]> {
    const attendances = await this.ormRepository
      .createQueryBuilder('attendances')
      .innerJoinAndSelect('attendances.lot', 'lots')
      .innerJoinAndSelect('attendances.customer', 'customers')
      .innerJoinAndSelect('lots.enterprise', 'enterprises')
      .where('attendances.brokerId = :brokerId', { brokerId })
      .andWhere('lots.enterpriseId = :enterpriseId', { enterpriseId })
      .getMany();

    return attendances;
  }

  public async save(attendance: Attendance): Promise<Attendance> {
    return this.ormRepository.save(attendance);
  }
}

export default AttendancesRepository;
