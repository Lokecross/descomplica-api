import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateOnesignalIdService from './UpdateOnesignalIdService';

let fakeUsersRepository: FakeUsersRepository;
let updateOnesignalId: UpdateOnesignalIdService;

describe('UpdateOnesignalId', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateOnesignalId = new UpdateOnesignalIdService(fakeUsersRepository);
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateOnesignalId.execute({
      user_id: user.id,
      onesignal_id: 'onesignal-id',
    });

    expect(updatedUser.onesignal_id).toBe('onesignal-id');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateOnesignalId.execute({
        user_id: 'non-existing-user-id',
        onesignal_id: 'onesignal-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
