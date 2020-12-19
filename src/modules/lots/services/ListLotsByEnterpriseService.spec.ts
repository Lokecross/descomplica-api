import FakeLotsRepository from '../repositories/fakes/FakeLotsRepository';
import ListLotsService from './ListLotsService';

let fakeLotsRepository: FakeLotsRepository;

let listLots: ListLotsService;

describe('ListLots', () => {
  beforeEach(() => {
    fakeLotsRepository = new FakeLotsRepository();

    listLots = new ListLotsService(fakeLotsRepository);
  });

  it('should be able to list enterprises', async () => {
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

    const lots = await listLots.execute();

    expect(lots).toStrictEqual([lot]);
  });
});
