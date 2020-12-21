import FakeProfessionsRepository from '../repositories/fakes/FakeProfessionsRepository';
import CreateProfessionService from './CreateProfessionService';

let fakeProfessionsRepository: FakeProfessionsRepository;

let createProfession: CreateProfessionService;

describe('CreateProfession', () => {
  beforeEach(() => {
    fakeProfessionsRepository = new FakeProfessionsRepository();

    createProfession = new CreateProfessionService(fakeProfessionsRepository);
  });

  it('should be able to create a new profession', async () => {
    const profession = await createProfession.execute({
      name: 'DEV',
      sankhya_id: '1',
    });

    expect(profession).toHaveProperty('id');
    expect(profession.name).toBe('DEV');
    expect(profession.sankhya_id).toBe('1');
  });
});
