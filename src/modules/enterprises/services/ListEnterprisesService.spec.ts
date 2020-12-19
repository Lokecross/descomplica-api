import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';
import ListEnterprisesService from './ListEnterprisesService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;

let listEnterprises: ListEnterprisesService;

describe('ListEnterprises', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();

    listEnterprises = new ListEnterprisesService(fakeEnterprisesRepository);
  });

  it('should be able to list enterprises', async () => {
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

    const enterprises = await listEnterprises.execute();

    expect(enterprises).toStrictEqual([enterprise]);
  });
});
