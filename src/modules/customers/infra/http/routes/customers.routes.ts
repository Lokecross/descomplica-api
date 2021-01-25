import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAllowed from '@modules/users/infra/http/middlewares/ensureAllowed';
import CustomersController from '../controllers/CustomersController';
import CostumersByenterpriseController from '../controllers/CostumersByenterpriseController';

const customersRouter = Router({ mergeParams: true });
const customersController = new CustomersController();
const costumersByenterpriseController = new CostumersByenterpriseController();

customersRouter.get(
  '/',
  ensureAuthenticated,
  (...all) => ensureAllowed(...all, ['supervisor', 'manager', 'broker']),
  customersController.index,
);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.get(
  '/enterprise/:enterprise_id',
  celebrate({
    [Segments.PARAMS]: {
      enterprise_id: Joi.string().uuid().required(),
    },
  }),
  costumersByenterpriseController.index,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
    },
  }),
  customersController.create,
);

customersRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      document: Joi.string(),
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      gender: Joi.string(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
