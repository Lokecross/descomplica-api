import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  onesignal_id: string;
}

@injectable()
class UpdateOnesignalIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, onesignal_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change onesignal id',
        401,
      );
    }

    user.onesignal_id = onesignal_id;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateOnesignalIdService;
