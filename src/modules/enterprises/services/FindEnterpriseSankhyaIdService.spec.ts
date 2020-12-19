import AppError from '@shared/errors/AppError';
import FakeEnterprisesRepository from '../repositories/fakes/FakeEnterprisesRepository';

import FindEnterpriseSankhyaIdService from './FindEnterpriseSankhyaIdService';

let fakeEnterprisesRepository: FakeEnterprisesRepository;

let findEnterpriseSankhyaId: FindEnterpriseSankhyaIdService;

describe('FindEnterpriseSankhyaId', () => {
  beforeEach(() => {
    fakeEnterprisesRepository = new FakeEnterprisesRepository();

    findEnterpriseSankhyaId = new FindEnterpriseSankhyaIdService(
      fakeEnterprisesRepository,
    );
  });

  it('should be able to find a enterprise by id', async () => {
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

    const existEnterprise = await findEnterpriseSankhyaId.execute({
      sankhya_id: '1',
    });

    expect(existEnterprise).toHaveProperty('id');
  });

  it('should not be able to find a enterprise by non existing enterprise', async () => {
    expect(
      findEnterpriseSankhyaId.execute({
        sankhya_id: 'non-existing-enterprise-sankhya-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
