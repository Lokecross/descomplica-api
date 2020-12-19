import AppError from '@shared/errors/AppError';
import FakeLotsRepository from '../repositories/fakes/FakeLotsRepository';
import UpdateLotService from './UpdateLotService';

let fakeLotsRepository: FakeLotsRepository;

let updateLot: UpdateLotService;

describe('UpdateLot', () => {
  beforeEach(() => {
    fakeLotsRepository = new FakeLotsRepository();

    updateLot = new UpdateLotService(fakeLotsRepository);
  });

  it('should be able to update the lot', async () => {
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

    const updatedLot = await updateLot.execute({
      id: lot.id,
      name: 'NOME LOTE 2',
      address: 'Rua 2',
      area: '535',
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

    expect(updatedLot.name).toBe('NOME LOTE 2');
    expect(updatedLot.address).toBe('Rua 2');
    expect(updatedLot.area).toBe('535');
  });

  it('should not be able to show the lot from non-existing lot', async () => {
    expect(
      updateLot.execute({
        id: 'non-existing-lot-id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
