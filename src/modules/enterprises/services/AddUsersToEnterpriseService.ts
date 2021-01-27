import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Enterprise from '../infra/typeorm/entities/Enterprise';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class AddUsersToEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<Enterprise> {
    const enterprise = await this.enterprisesRepository.findByIdWithUsers(id);

    if (!enterprise) {
      throw new AppError('Enterprise not found', 404);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (enterprise.users.findIndex(item => item.id === userId) !== -1) {
      throw new AppError('User is already linked on this enterprise');
    }

    enterprise.users.push(user);

    const updatedEnterprise = await this.enterprisesRepository.save(enterprise);

    return updatedEnterprise;
  }
}

export default AddUsersToEnterpriseService;
