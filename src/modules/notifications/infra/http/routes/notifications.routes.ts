import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get('/', notificationsController.index);

notificationsRouter.post('/', notificationsController.create);

export default notificationsRouter;
