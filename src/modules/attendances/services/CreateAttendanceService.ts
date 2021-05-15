import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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

    const customerExists = await this.customersRepository.findByDocument(
      document,
    );

    if (customerExists) {
      customerExists.name = name;
      customerExists.email = email;
      customerExists.phone = phone;
      customerExists.gender = gender;

      await this.customersRepository.save(customerExists);
    }

    const customer =
      customerExists ||
      (await this.customersRepository.create({
        document,
        name,
        email,
        phone,
        gender,
      }));

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
