import FakeEnterprisesRepository from '@modules/enterprises/repositories/fakes/FakeEnterprisesRepository';
import FakeLotsRepository from '@modules/lots/repositories/fakes/FakeLotsRepository';
import FakeBrokersRepository from '@modules/brokers/repositories/fakes/FakeBrokersRepository';
import FakeAttendancesRepository from '@modules/attendances/repositories/fakes/FakeAttendancesRepository';

import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ListCustomersByEnterpriseService from './ListCustomersByEnterpriseService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;
let fakeLotsRepository: FakeLotsRepository;
let fakeBrokersRepository: FakeBrokersRepository;
let fakeAttendancesRepository: FakeAttendancesRepository;

let fakeCustomersRepository: FakeCustomersRepository;

let listCustomersByEnterprise: ListCustomersByEnterpriseService;

describe('ListCustomersByEnterprise', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();
    fakeLotsRepository = new FakeLotsRepository();
    fakeBrokersRepository = new FakeBrokersRepository();
    fakeAttendancesRepository = new FakeAttendancesRepository();

    fakeCustomersRepository = new FakeCustomersRepository();

    listCustomersByEnterprise = new ListCustomersByEnterpriseService(
      fakeCustomersRepository,
    );
  });

  it('should be able to list customers', async () => {
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

    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
      gender: 'M',
    });

    await fakeAttendancesRepository.create({
      brokerId: broker.id,
      lotId: lot.id,
      note: 'NOTE',
      customerId: customer.id,
    });

    const customers = await listCustomersByEnterprise.execute({
      enterprise_id: enterprise.id,
    });

    expect(customers).toStrictEqual([customer]);
  });
});
