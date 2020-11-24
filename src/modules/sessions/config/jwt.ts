import passport from 'passport';
import passportJWT from 'passport-jwt';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const { ExtractJwt, Strategy } = passportJWT;

const params = {
  secretOrKey: authConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

interface IResponse {
  initialize: any;
  authenticate: any;
}

class AuthenticateUserJwt {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public execute(): IResponse {
    const strategy = new Strategy(params, async (payload, done) => {
      const user = await this.usersRepository.findById(payload.id);

      if (user) {
        return done(null, { id: user.id });
      }

      return done(
        new AppError('Incorrect email/password combination', 401),
        null,
      );
    });

    passport.use(strategy);

    return {
      initialize() {
        return passport.initialize();
      },
      authenticate() {
        return passport.authenticate('jwt', authConfig.jwt.session);
      },
    };
  }
}

export default AuthenticateUserJwt;
