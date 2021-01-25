import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import User, { RoleOptions } from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  role: RoleOptions;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ role, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.role = role;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default CreateUserService;
