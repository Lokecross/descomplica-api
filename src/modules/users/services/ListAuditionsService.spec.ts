import FakeAuditionsRepository from '../repositories/fakes/FakeAuditionsRepository';
import ListAuditionsService from './ListAuditionsService';

let fakeAuditionsRepository: FakeAuditionsRepository;

let listAuditions: ListAuditionsService;

describe('ListAuditions', () => {
  beforeEach(() => {
    fakeAuditionsRepository = new FakeAuditionsRepository();

    listAuditions = new ListAuditionsService(fakeAuditionsRepository);
  });

  it('should be able to list auditions', async () => {
    const audition = await fakeAuditionsRepository.create({
      title: 'Criou',
    });

    const auditions = await listAuditions.execute();

    expect(auditions).toStrictEqual([audition]);
  });
});
