import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SimulateController from '../controllers/SimulateController';
import ConsultProspectController from '../controllers/ConsultProspectController';
import CreateReservetionController from '../controllers/CreateReservetionController';
import SendProposalController from '../controllers/SendProposalController';

const simulateRouter = Router();
const simulateController = new SimulateController();
const consultProspectController = new ConsultProspectController();
const createReservetionController = new CreateReservetionController();
const sendProposalController = new SendProposalController();

simulateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code_id: Joi.string().required(),
    },
  }),
  simulateController.create,
);

simulateRouter.post(
  '/prospect',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
    },
  }),
  consultProspectController.create,
);

simulateRouter.post(
  '/reservation',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      first_date: Joi.string().required(),
      readjustment: Joi.string().required(),
      financed: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      corretor_cpf: Joi.string().required(),
      lot_id: Joi.string().required(),
      input: Joi.string().required(),
      price: Joi.string().required(),
      proposal: Joi.string().required(),
      franquia: Joi.string().required(),
      corretor: Joi.string().required(),
      admin: Joi.string().required(),
      input_venc: Joi.string().required(),
      is_price: Joi.boolean().required(),
      installments: Joi.string().required(),
      period: Joi.string().required(),
      installment: Joi.string().required(),
      tax: Joi.string().required(),
      is_financed: Joi.boolean().required(),
    },
  }),
  createReservetionController.create,
);

simulateRouter.post(
  '/proposal',
  celebrate({
    [Segments.BODY]: {
      proposal_id: Joi.string().required(),
    },
  }),
  sendProposalController.create,
);

export default simulateRouter;
