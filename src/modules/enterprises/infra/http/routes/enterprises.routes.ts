import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EnterprisesController from '../controllers/EnterprisesController';

const brokersRouter = Router();
const enterprisesController = new EnterprisesController();

brokersRouter.use(ensureAuthenticated);

brokersRouter.get('/', enterprisesController.index);

export default brokersRouter;
