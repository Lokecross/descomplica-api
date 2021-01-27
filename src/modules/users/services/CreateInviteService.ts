import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IInvitesRepository from '../repositories/IInvitesRepository';
import IRandomProvider from '../providers/RandomProvider/models/IRandomProvider';

import Invite from '../infra/typeorm/entities/Invite';

interface IRequest {
  supervisorId: string;
}

@injectable()
class CreateInviteService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,

    @inject('RandomProvider')
    private randomProvider: IRandomProvider,
  ) {}

  public async execute({ supervisorId }: IRequest): Promise<Invite> {
    const user = await this.usersRepository.findById(supervisorId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.role === 'broker') {
      throw new AppError('User is not valid to create invite');
    }

    const code = await this.randomProvider.generateString(8);

    const invite = await this.invitesRepository.create({
      code,
      supervisorId,
    });

    return invite;
  }
}

export default CreateInviteService;
