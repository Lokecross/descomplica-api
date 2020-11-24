import passport from 'passport';
import passportJWT from 'passport-jwt';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

const users = [{ id: '7561b886-555b-49bc-9815-e192a5cce503' }];

const { ExtractJwt } = passportJWT;
const { Strategy } = passportJWT;

const params = {
  secretOrKey: authConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const auth = (): { initialize: any; authenticate: any } => {
  const strategy = new Strategy(params, (payload, done) => {
    const user = users.find(findUser => findUser.id === payload.id) || null;
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
};

export default auth;
