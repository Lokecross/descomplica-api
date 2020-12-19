import FakeLotsRepository from '../repositories/fakes/FakeLotsRepository';
import CreateLotService from './CreateLotService';

let fakeLotsRepository: FakeLotsRepository;

let createLot: CreateLotService;

describe('CreateLot', () => {
  beforeEach(() => {
    fakeLotsRepository = new FakeLotsRepository();

    createLot = new CreateLotService(fakeLotsRepository);
  });

  it('should be able to create a new lot', async () => {
    const lot = await createLot.execute({
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

    expect(lot).toHaveProperty('id');
    expect(lot.name).toBe('NOME LOTE');
    expect(lot.address).toBe('Rua 1');
    expect(lot.area).toBe('534');
  });
});
