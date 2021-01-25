import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { RoleOptions } from '@modules/users/infra/typeorm/entities/User';

export default async function ensureAllowed(
  req: Request,
  res: Response,
  next: NextFunction,
  roles: Array<RoleOptions>,
): Promise<void> {
  const usersRepository: IUsersRepository = new UsersRepository();

  const user = await usersRepository.findById(req.user.id);

  if (!user) {
    throw new AppError('User does not exists');
  }

  if (!user.role) {
    throw new AppError('User role is not defined');
  }

  if (roles.findIndex(item => item === user.role) < 0) {
    throw new AppError(`Role ${user.role} is not allowed`);
  }

  return next();
}
