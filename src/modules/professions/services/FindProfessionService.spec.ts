import AppError from '@shared/errors/AppError';
import FakeProfessionsRepository from '../repositories/fakes/FakeProfessionsRepository';

import FindProfessionService from './FindProfessionService';

let fakeProfessionsRepository: FakeProfessionsRepository;

let findProfession: FindProfessionService;

describe('FindProfession', () => {
  beforeEach(() => {
    fakeProfessionsRepository = new FakeProfessionsRepository();

    findProfession = new FindProfessionService(fakeProfessionsRepository);
  });

  it('should be able to find a profession by id', async () => {
    const profession = await fakeProfessionsRepository.create({
      name: 'DEV',
      sankhya_id: '1',
    });

    const existProfession = await findProfession.execute({ id: profession.id });

    expect(existProfession).toHaveProperty('id');
  });

  it('should not be able to find a profession by non existing profession', async () => {
    expect(
      findProfession.execute({ id: 'non-existing-profession-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
