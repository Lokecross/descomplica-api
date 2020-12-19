import AppError from '@shared/errors/AppError';
import FakeLotsRepository from '../repositories/fakes/FakeLotsRepository';

import FindLotService from './FindLotService';

let fakeLotsRepository: FakeLotsRepository;

let findLot: FindLotService;

describe('FindLot', () => {
  beforeEach(() => {
    fakeLotsRepository = new FakeLotsRepository();

    findLot = new FindLotService(fakeLotsRepository);
  });

  it('should be able to find a lot by id', async () => {
    const lot = await fakeLotsRepository.create({
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
      enterpriseId: '',
    });

    const existLot = await findLot.execute({ id: lot.id });

    expect(existLot).toHaveProperty('id');
  });

  it('should not be able to find a lot by non existing lot', async () => {
    expect(
      findLot.execute({ id: 'non-existing-lot-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
