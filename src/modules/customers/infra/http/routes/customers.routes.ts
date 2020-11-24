import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router({ mergeParams: true });
const customersController = new CustomersController();

customersRouter.get('/', customersController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
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
