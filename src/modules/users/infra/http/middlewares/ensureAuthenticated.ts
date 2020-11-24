import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

import googleAuthenticate from './googleAuthenticate';
import localAuthenticate from './localAuthenticate';

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const Authorization = req.headers.authorization;
  const LoggedWith = req.headers.loggedwith as 'Google' | 'Local';

  if (!LoggedWith) {
    throw new AppError('LoggedWith is missing', 401);
  }

  if (!Authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  if (LoggedWith !== 'Google' && LoggedWith !== 'Local') {
    throw new AppError('LoggedWith is invalid', 401);
  }

  const [, token] = Authorization.split(' ');

  const authenticate = {
    Google: googleAuthenticate,
    Local: localAuthenticate,
  };

  try {
    const userEmail = await authenticate[LoggedWith](token);

    console.log(userEmail);

    req.user = {
      id: userEmail,
    };

    return next();
  } catch (error) {
    throw new AppError('Authenticate failed', 401);
  }
}
