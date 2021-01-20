import { sign } from 'jsonwebtoken';

import { injectable, inject } from 'tsyringe';

import { OAuth2Client } from 'google-auth-library';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  googleToken: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserGoogleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ googleToken }: IRequest): Promise<IResponse> {
    const oAuth2Client = new OAuth2Client();

    const google = await oAuth2Client.verifyIdToken({
      idToken: googleToken,
      audience: [
        '666222736026-9onr8rf3s2dj71evtk69o9ted17fn68p.apps.googleusercontent.com',
        '666222736026-9fj5iltfq383pm5v47kr41ng88894oos.apps.googleusercontent.com',
      ],
    });

    const user = await this.usersRepository.findByEmail(
      google.getPayload().email,
    );

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id, email: user.email }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserGoogleService;
