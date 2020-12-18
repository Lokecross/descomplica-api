import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BrokersCpfController from '../controllers/BrokersCpfController';

const brokersRouter = Router();
const brokersCpfController = new BrokersCpfController();

brokersRouter.get(
  '/cpf/:cpf',
  celebrate({
    [Segments.PARAMS]: {
      cpf: Joi.string(),
    },
  }),
  brokersCpfController.show,
);

export default brokersRouter;
