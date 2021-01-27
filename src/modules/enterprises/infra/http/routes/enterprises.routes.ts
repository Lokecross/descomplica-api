import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EnterprisesController from '../controllers/EnterprisesController';
import AmountUnitiesController from '../controllers/AmountUnitiesController';
import UsersEnterpriseController from '../controllers/UsersEnterpriseController';

const enterprisesRouter = Router();
const enterprisesController = new EnterprisesController();
const amountUnitiesController = new AmountUnitiesController();
const usersEnterpriseController = new UsersEnterpriseController();

enterprisesRouter.use(ensureAuthenticated);

enterprisesRouter.get('/', enterprisesController.index);

enterprisesRouter.get('/amount', amountUnitiesController.show);

enterprisesRouter.get('/:id', enterprisesController.show);

enterprisesRouter.post(
  '/:id/user',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      userId: Joi.string().uuid().required(),
    },
  }),
  usersEnterpriseController.create,
);

enterprisesRouter.delete(
  '/:id/user/:userId',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      userId: Joi.string().uuid().required(),
    },
  }),
  usersEnterpriseController.delete,
);

export default enterprisesRouter;
