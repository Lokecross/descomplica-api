import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfessionsController from '../controllers/ProfessionsController';

const brokersRouter = Router();
const professionsController = new ProfessionsController();

brokersRouter.use(ensureAuthenticated);

brokersRouter.get('/', professionsController.index);

export default brokersRouter;
