import FakeAuditionsRepository from '@modules/users/repositories/fakes/FakeAuditionsRepository';
import FakeEnterprisesRepository from '@modules/enterprises/repositories/fakes/FakeEnterprisesRepository';
import FakeLotsRepository from '@modules/lots/repositories/fakes/FakeLotsRepository';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import FakeBrokersRepository from '@modules/brokers/repositories/fakes/FakeBrokersRepository';
import FakeSankhyaProvider from '@shared/container/providers/Sankhya/fakes/FakeSankhyaProvider';

import FakeAttendancesRepository from '../repositories/fakes/FakeAttendancesRepository';
import CreateAttendanceService from './CreateAttendanceService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;
let fakeLotsRepository: FakeLotsRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeBrokersRepository: FakeBrokersRepository;
let fakeSankhyaProvider: FakeSankhyaProvider;
let fakeAuditionsRepository: FakeAuditionsRepository;

let fakeAttendancesRepository: FakeAttendancesRepository;

let createAttendance: CreateAttendanceService;

describe('CreateAttendance', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();
    fakeLotsRepository = new FakeLotsRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeBrokersRepository = new FakeBrokersRepository();
    fakeAuditionsRepository = new FakeAuditionsRepository();

    fakeAttendancesRepository = new FakeAttendancesRepository();

    createAttendance = new CreateAttendanceService(
      fakeAttendancesRepository,
      fakeCustomersRepository,
      fakeLotsRepository,
      fakeEnterprisesRepository,
      fakeBrokersRepository,
      fakeAuditionsRepository,
      fakeSankhyaProvider,
    );
  });

  it('should be able to create a new attendance', async () => {
    const enterprise = await fakeEnterprisesRepository.create({
      name: 'JARDIM II',
      city: 'GOIANIA',
      name_abbreviated: 'JARDIM II',
      reservation_amount: '1',
      reservation_timer: '48',
      sankhya_id: '1',
      uf: 'GO',
      village: 'CENTRO',
    });

    const lot = await fakeLotsRepository.create({
      enterpriseId: enterprise.id,
      name: 'NOME LOTE',
      address: 'Rua 1',
      area: '534',
      block: '44',
      config_back: '12',
      config_chamfer: '10',
      config_front: '20',
      config_left: '15',
      config_right: '11',
      config_variant: '30',
      measure_back: '22',
      measure_chamfer: '24',
      measure_front: '26',
      measure_left: '28',
      measure_right: '29',
      measure_variant: '31',
      note: 'DESC',
      x: '10',
      y: '16',
      sankhya_id: '1',
      situation: 'vigente',
      enterprise_sankhya_id: '1',
      initials_situation: 'VI',
      price: '500000',
      reservation_timer: '48',
    });

    const broker = await fakeBrokersRepository.create({
      name: 'John Doe',
      cpf: '12345678909',
      creci: '123456',
      creci_uf: 'GO',
      email: 'john@doe.com',
      phone: '62988884444',
      sankhya_id: '1',
    });

    const attendance = await createAttendance.execute({
      brokerId: broker.id,
      lotId: lot.id,
      note: 'NOTE',
      document: '12345678909',
      email: 'john@doe.com',
      name: 'John Doe',
      phone: '62982374123',
      gender: 'M',
    });

    expect(attendance).toHaveProperty('id');
    expect(attendance.note).toBe('NOTE');
  });
});
