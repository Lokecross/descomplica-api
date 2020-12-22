import AppError from '@shared/errors/AppError';

import FakeBrokersRepository from '@modules/brokers/repositories/fakes/FakeBrokersRepository';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
let fakeBrokersRepository: FakeBrokersRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBrokersRepository = new FakeBrokersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const broker = await fakeBrokersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678909',
      creci: '34231',
      creci_uf: 'GO',
      phone: '62984821238',
      sankhya_id: '1',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      brokerId: broker.id,
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
