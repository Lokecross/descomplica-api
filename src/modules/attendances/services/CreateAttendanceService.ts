import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ILotsRepository from '@modules/lots/repositories/ILotsRepository';
import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

import Attendance from '../infra/typeorm/entities/Attendance';

import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  lotId: string;
  brokerId: string;
  note: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

@injectable()
class CreateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('LotsRepository')
    private lotsRepository: ILotsRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,

    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({
    document,
    name,
    email,
    phone,
    brokerId,
    lotId,
    note,
    gender,
  }: IRequest): Promise<Attendance> {
    const lot = await this.lotsRepository.findById(lotId);

    if (!lot) {
      throw new AppError('Lot not found', 404);
    }

    const broker = await this.brokersRepository.findById(brokerId);

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    try {
      await this.sankhyaProvider.createReservation(
        lot.sankhya_id,
        broker.sankhya_id,
        document,
        name,
        email,
        phone,
        note,
        gender,
      );
    } catch (error) {
      throw new AppError(error.message);
    }

    lot.initials_situation = 'RE';
    lot.situation = 'Reservado';

    await this.lotsRepository.save(lot);

    const customer = await this.customersRepository.create({
      document,
      name,
      email,
      phone,
      gender,
    });

    const attendanceCreate = await this.attendancesRepository.create({
      brokerId,
      customerId: customer.id,
      lotId,
      note,
    });

    const attendance = await this.attendancesRepository.findById(
      attendanceCreate.id,
    );

    return attendance;
  }
}

export default CreateAttendanceService;
