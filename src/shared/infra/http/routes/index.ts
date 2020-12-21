import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import simulateRouter from '@modules/simulate/infra/http/routes/simulate.routes';
import brokersRouter from '@modules/brokers/infra/http/routes/brokers.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';
import enterprisesRouter from '@modules/enterprises/infra/http/routes/enterprises.routes';
import lotsRouter from '@modules/lots/infra/http/routes/lots.routes';
import professionsRouter from '@modules/professions/infra/http/routes/professions.routes';
import attendancesRouter from '@modules/attendances/infra/http/routes/attendances.routes';

const routes = Router({ mergeParams: true });

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);
routes.use('/simulate', simulateRouter);
routes.use('/brokers', brokersRouter);
routes.use('/notifications', notificationsRouter);
routes.use('/enterprises', enterprisesRouter);
routes.use('/lots', lotsRouter);
routes.use('/professions', professionsRouter);
routes.use('/attendances', attendancesRouter);

export default routes;
