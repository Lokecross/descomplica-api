import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
  }: IRequest): Promise<User> {
    const broker = await this.brokersRepository.findByCpf(cpf);

    if (!broker) {
      throw new AppError('Broker does not exists');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      brokerId: broker.id,
      role: 'broker',
    });

    return user;
  }
}

export default CreateUserService;
