import AppError from '@shared/errors/AppError';
import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';

import FindEnterpriseService from './FindEnterpriseService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;

let findEnterprise: FindEnterpriseService;

describe('FindEnterprise', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();

    findEnterprise = new FindEnterpriseService(fakeEnterprisesRepository);
  });

  it('should be able to find a enterprise by id', async () => {
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

    const existEnterprise = await findEnterprise.execute({ id: enterprise.id });

    expect(existEnterprise).toHaveProperty('id');
  });

  it('should not be able to find a enterprise by non existing enterprise', async () => {
    expect(
      findEnterprise.execute({ id: 'non-existing-enterprise-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
