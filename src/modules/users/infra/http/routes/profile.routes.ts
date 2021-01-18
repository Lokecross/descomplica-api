import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import OnesignalController from '../controllers/OnesignalController';

const profileRouter = Router();
const profileController = new ProfileController();
const onesignalController = new OnesignalController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.patch(
  '/onesignal',
  celebrate({
    [Segments.BODY]: {
      onesignal_id: Joi.string().required(),
    },
  }),
  onesignalController.update,
);

export default profileRouter;
