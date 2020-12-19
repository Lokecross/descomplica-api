import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';
import CreateEnterpriseService from './CreateEnterpriseService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;

let createEnterprise: CreateEnterpriseService;

describe('CreateEnterprise', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();

    createEnterprise = new CreateEnterpriseService(fakeEnterprisesRepository);
  });

  it('should be able to create a new enterprise', async () => {
    const enterprise = await createEnterprise.execute({
      name: 'JARDIM II',
      city: 'GOIANIA',
      name_abbreviated: 'JARDIM II',
      reservation_amount: '1',
      reservation_timer: '48',
      sankhya_id: '1',
      uf: 'GO',
      village: 'CENTRO',
    });

    expect(enterprise).toHaveProperty('id');
    expect(enterprise.name).toBe('JARDIM II');
    expect(enterprise.city).toBe('GOIANIA');
    expect(enterprise.name_abbreviated).toBe('JARDIM II');
    expect(enterprise.reservation_amount).toBe('1');
    expect(enterprise.reservation_timer).toBe('48');
    expect(enterprise.sankhya_id).toBe('1');
    expect(enterprise.uf).toBe('GO');
    expect(enterprise.village).toBe('CENTRO');
  });
});
