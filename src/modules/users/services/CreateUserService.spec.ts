import AppError from '@shared/errors/AppError';

import FakeBrokersRepository from '@modules/brokers/repositories/fakes/FakeBrokersRepository';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeBrokersRepository: FakeBrokersRepository;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBrokersRepository = new FakeBrokersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeBrokersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    await fakeBrokersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678909',
      creci: '34231',
      creci_uf: 'GO',
      phone: '62984821238',
      sankhya_id: '1',
    });

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '12345678909',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await fakeBrokersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678909',
      creci: '34231',
      creci_uf: 'GO',
      phone: '62984821238',
      sankhya_id: '1',
    });

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '12345678909',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: '12345678909',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
