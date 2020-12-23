import FakeLotsRepository from '@modules/lots/repositories/fakes/FakeLotsRepository';
import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';
import AmountUnitiesService from './AmountUnitiesService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;
let fakeLotsRepository: FakeLotsRepository;

let AmountUnities: AmountUnitiesService;

describe('AmountUnities', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();
    fakeLotsRepository = new FakeLotsRepository();

    AmountUnities = new AmountUnitiesService(
      fakeEnterprisesRepository,
      fakeLotsRepository,
    );
  });

  it('should be able to list enterprises', async () => {
    await fakeEnterprisesRepository.create({
      name: 'JARDIM II',
      city: 'GOIANIA',
      name_abbreviated: 'JARDIM II',
      reservation_amount: '1',
      reservation_timer: '48',
      sankhya_id: '1',
      uf: 'GO',
      village: 'CENTRO',
    });

    const enterprises = await AmountUnities.execute();

    expect(enterprises.enterprises).toBe(1);
  });
});
