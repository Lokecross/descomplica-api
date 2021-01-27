import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IInvitesRepository from '../repositories/IInvitesRepository';

import Invite from '../infra/typeorm/entities/Invite';

interface IRequest {
  code: string;
}

@injectable()
class ValidateInviteService {
  constructor(
    @inject('InvitesRepository')
    private invitesRepository: IInvitesRepository,
  ) {}

  public async execute({ code }: IRequest): Promise<Invite> {
    const invite = await this.invitesRepository.findByCode(code);

    if (!invite) {
      throw new AppError('Code is not valid');
    }

    return invite;
  }
}

export default ValidateInviteService;
