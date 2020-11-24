import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function localAuthenticate(
  token: string,
): Promise<string> {
  const decoded = verify(token, authConfig.jwt.secret);

  const { sub } = decoded as ITokenPayload;

  return sub;
}
