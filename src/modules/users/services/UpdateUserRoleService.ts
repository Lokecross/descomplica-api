import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import User, { RoleOptions } from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ITeamsRepository from '../repositories/ITeamsRepository';

interface IRequest {
  user_id: string;
  role: RoleOptions;
}

@injectable()
class UpdateUserRoleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({ role, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (role === user.role) {
      throw new AppError(`User role is already ${role}`);
    }

    if (
      (role === 'supervisor' || role === 'manager') &&
      user.role === 'broker'
    ) {
      await this.teamsRepository.create({
        supervisorId: user.id,
      });
    }

    if (role === 'broker' && user.supervisorTeam) {
      await this.teamsRepository.delete(user.supervisorTeam.id);
    }

    user.role = role;
    delete user.supervisorTeam;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserRoleService;
