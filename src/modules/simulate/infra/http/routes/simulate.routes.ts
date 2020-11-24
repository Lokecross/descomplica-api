import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SimulateController from '../controllers/SimulateController';

const simulateRouter = Router();
const simulateController = new SimulateController();

simulateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code_id: Joi.string().required(),
    },
  }),
  simulateController.create,
);

export default simulateRouter;
