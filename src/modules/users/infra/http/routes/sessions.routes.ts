import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';
import GoogleController from '../controllers/GoogleController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const googleController = new GoogleController();

sessionsRouter.post(
  '/jwt',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.post(
  '/google',
  celebrate({
    [Segments.BODY]: {
      googleToken: Joi.string().required(),
    },
  }),
  googleController.create,
);

export default sessionsRouter;
