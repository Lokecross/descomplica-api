import AppError from '@shared/errors/AppError';
import FakeProfessionsRepository from '../repositories/fakes/FakeProfessionsRepository';

import FindProfessionSankhyaIdService from './FindProfessionSankhyaIdService';

let fakeProfessionsRepository: FakeProfessionsRepository;

let findProfessionSankhyaId: FindProfessionSankhyaIdService;

describe('FindProfessionSankhyaId', () => {
  beforeEach(() => {
    fakeProfessionsRepository = new FakeProfessionsRepository();

    findProfessionSankhyaId = new FindProfessionSankhyaIdService(
      fakeProfessionsRepository,
    );
  });

  it('should be able to find a profession by id', async () => {
    await fakeProfessionsRepository.create({
      name: 'DEV',
      sankhya_id: '1',
    });

    const existProfession = await findProfessionSankhyaId.execute({
      sankhya_id: '1',
    });

    expect(existProfession).toHaveProperty('id');
  });

  it('should not be able to find a profession by non existing profession', async () => {
    expect(
      findProfessionSankhyaId.execute({
        sankhya_id: 'non-existing-profession-sankhya-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
