import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ILotsRepository from '@modules/lots/repositories/ILotsRepository';
import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import IAuditionsRepository from '@modules/users/repositories/IAuditionsRepository';
import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';

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

    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,

    @inject('AuditionsRepository')
    private auditionsRepository: IAuditionsRepository,

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
      status: 'in_progress',
    });

    const attendance = await this.attendancesRepository.findById(
      attendanceCreate.id,
    );

    const enterprise = await this.enterprisesRepository.findById(
      lot.enterpriseId,
    );

    await this.auditionsRepository.create({
      title: `O(a) corretor(a) ${broker.name} criou um atendimento no ${enterprise.name} quadra ${lot.block} lote ${lot.name} para o cliente ${name}`,
    });

    return attendance;
  }
}

export default CreateAttendanceService;
