import AppError from '@shared/errors/AppError';
import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';
import UpdateEnterpriseService from './UpdateEnterpriseService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;

let updateEnterprise: UpdateEnterpriseService;

describe('UpdateEnterprise', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();

    updateEnterprise = new UpdateEnterpriseService(fakeEnterprisesRepository);
  });

  it('should be able to update the enterprise', async () => {
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

    const updatedEnterprise = await updateEnterprise.execute({
      id: enterprise.id,
      name: 'JARDIM III',
      city: 'GOIANIA',
      name_abbreviated: 'JARDIM II',
      reservation_amount: '1',
      reservation_timer: '48',
      sankhya_id: '1',
      uf: 'GO',
      village: 'CENTRO',
    });

    expect(updatedEnterprise.name).toBe('JARDIM III');
    expect(updatedEnterprise.city).toBe('GOIANIA');
    expect(updatedEnterprise.name_abbreviated).toBe('JARDIM II');
    expect(updatedEnterprise.reservation_amount).toBe('1');
    expect(updatedEnterprise.reservation_timer).toBe('48');
    expect(updatedEnterprise.sankhya_id).toBe('1');
    expect(updatedEnterprise.uf).toBe('GO');
    expect(updatedEnterprise.village).toBe('CENTRO');
  });

  it('should not be able to show the enterprise from non-existing enterprise', async () => {
    expect(
      updateEnterprise.execute({
        id: 'non-existing-enterprise-id',
        name: 'JARDIM II',
        city: 'GOIANIA',
        name_abbreviated: 'JARDIM II',
        reservation_amount: '1',
        reservation_timer: '48',
        sankhya_id: '1',
        uf: 'GO',
        village: 'CENTRO',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
