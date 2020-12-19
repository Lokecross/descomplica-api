import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import LotsController from '../controllers/LotsController';

const brokersRouter = Router();
const lotsController = new LotsController();

brokersRouter.get(
  '/enterprise/:enterprise_id',
  celebrate({
    [Segments.PARAMS]: {
      enterprise_id: Joi.string(),
    },
  }),
  lotsController.index,
);

export default brokersRouter;
