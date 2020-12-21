import AppError from '@shared/errors/AppError';
import FakeProfessionsRepository from '../repositories/fakes/FakeProfessionsRepository';
import UpdateProfessionService from './UpdateProfessionService';

let fakeProfessionsRepository: FakeProfessionsRepository;

let updateProfession: UpdateProfessionService;

describe('UpdateProfession', () => {
  beforeEach(() => {
    fakeProfessionsRepository = new FakeProfessionsRepository();

    updateProfession = new UpdateProfessionService(fakeProfessionsRepository);
  });

  it('should be able to update the profession', async () => {
    const profession = await fakeProfessionsRepository.create({
      name: 'DEV',
      sankhya_id: '1',
    });

    const updatedProfession = await updateProfession.execute({
      id: profession.id,
      name: 'PROD',
      sankhya_id: '2',
    });

    expect(updatedProfession.name).toBe('PROD');
    expect(updatedProfession.sankhya_id).toBe('2');
  });

  it('should not be able to show the profession from non-existing profession', async () => {
    expect(
      updateProfession.execute({
        id: 'non-existing-profession-id',
        name: 'PROD',
        sankhya_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
