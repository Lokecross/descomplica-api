import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  id: string;
  email: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const Authorization = req.headers.authorization;

  if (!Authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = Authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { id } = decoded as ITokenPayload;

    req.user = {
      id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
