import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import customersRouter from '@modules/customers/infra/http/routes/customers.routes';

const routes = Router({ mergeParams: true });

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/customers', customersRouter);

export default routes;
