import AppError from '@shared/errors/AppError';

import FakeBrokersRepository from '@modules/brokers/repositories/fakes/FakeBrokersRepository';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateOnesignalIdService from './UpdateOnesignalIdService';

let fakeUsersRepository: FakeUsersRepository;
let updateOnesignalId: UpdateOnesignalIdService;
let fakeBrokersRepository: FakeBrokersRepository;

describe('UpdateOnesignalId', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBrokersRepository = new FakeBrokersRepository();

    updateOnesignalId = new UpdateOnesignalIdService(fakeUsersRepository);
  });

  it('should be able update the profile', async () => {
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
