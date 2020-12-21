import FakeProfessionsRepository from '../repositories/fakes/FakeProfessionsRepository';
import ListProfessionsService from './ListProfessionsService';

let fakeProfessionsRepository: FakeProfessionsRepository;

let listProfessions: ListProfessionsService;

describe('ListProfessions', () => {
  beforeEach(() => {
    fakeProfessionsRepository = new FakeProfessionsRepository();

    listProfessions = new ListProfessionsService(fakeProfessionsRepository);
  });

  it('should be able to list professions', async () => {
    const profession = await fakeProfessionsRepository.create({
      name: 'DEV',
      sankhya_id: '1',
    });

    const professions = await listProfessions.execute();

    expect(professions).toStrictEqual([profession]);
  });
});
