import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IInvitesRepository from '../repositories/IInvitesRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  code: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    code,
  }: IRequest): Promise<User> {
    const broker = await this.brokersRepository.findByCpf(cpf);

    if (!broker) {
      throw new AppError('Broker does not exists');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const checkBrokerUsed = await this.usersRepository.findByBroker(broker.id);

    if (checkBrokerUsed) {
      throw new AppError('CPF is already used');
    }

    const invite = await this.invitesRepository.findByCode(code);

    if (!invite) {
      throw new AppError('Code is not valid');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const supervisor = await this.usersRepository.findById(invite.supervisorId);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      brokerId: broker.id,
      role: 'broker',
      teamId: supervisor.supervisorTeam.id,
    });

    return user;
  }
}

export default CreateUserService;
