import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserRoleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return classToClass(users);
  }
}

export default UpdateUserRoleService;
