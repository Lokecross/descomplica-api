import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAllowed from '@modules/users/infra/http/middlewares/ensureAllowed';
import RequestCustomersController from '../controllers/RequestCustomersController';
import ApproveRequestCustomerController from '../controllers/ApproveRequestCustomerController';
import RefuseRequestCustomerController from '../controllers/RefuseRequestCustomerController';

const requestCustomerRouter = Router({ mergeParams: true });
const requestCustomersController = new RequestCustomersController();
const approveRequestCustomerController = new ApproveRequestCustomerController();
const refuseRequestCustomerController = new RefuseRequestCustomerController();

requestCustomerRouter.get(
  '/',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  requestCustomersController.index,
);

requestCustomerRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
      customerId: Joi.string().required(),
    },
  }),
  requestCustomersController.create,
);

requestCustomerRouter.post(
  '/:id/approve',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  approveRequestCustomerController.create,
);

requestCustomerRouter.post(
  '/:id/refuse',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      notes: Joi.string().required(),
    },
  }),
  refuseRequestCustomerController.create,
);

export default requestCustomerRouter;
