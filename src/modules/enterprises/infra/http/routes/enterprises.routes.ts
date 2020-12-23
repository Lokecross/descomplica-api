import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EnterprisesController from '../controllers/EnterprisesController';
import AmountUnitiesController from '../controllers/AmountUnitiesController';

const brokersRouter = Router();
const enterprisesController = new EnterprisesController();
const amountUnitiesController = new AmountUnitiesController();

brokersRouter.use(ensureAuthenticated);

brokersRouter.get('/', enterprisesController.index);

brokersRouter.get('/amount', amountUnitiesController.show);

export default brokersRouter;
