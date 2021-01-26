import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ITeamsRepository from '../repositories/ITeamsRepository';

interface IRequest {
  user_id: string;
  teamId: string;
}

@injectable()
class UpdateUserRoleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({ teamId, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const checkTeamExists = await this.teamsRepository.findById(teamId);

    if (!checkTeamExists) {
      throw new AppError('Team does not exists');
    }

    if (user.role !== 'broker') {
      throw new AppError('User is not a broker');
    }

    user.teamId = teamId;
    delete user.supervisorTeam;
    delete user.team;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserRoleService;
