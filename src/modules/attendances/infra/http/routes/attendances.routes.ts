import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AttendancesController from '../controllers/AttendancesController';
import AttendancesByEnterpriseController from '../controllers/AttendancesByEnterpriseController';

const attendancesRouter = Router({ mergeParams: true });
const attendancesController = new AttendancesController();
const attendancesByEnterpriseController = new AttendancesByEnterpriseController();

attendancesRouter.use(ensureAuthenticated);

attendancesRouter.get('/', attendancesController.index);

attendancesRouter.get(
  '/enterprise/:enterprise_id',
  celebrate({
    [Segments.PARAMS]: {
      enterprise_id: Joi.string().uuid().required(),
    },
  }),
  attendancesByEnterpriseController.index,
);

attendancesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  attendancesController.show,
);

attendancesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      lotId: Joi.string().required(),
      brokerId: Joi.string().required(),
      note: Joi.string().required(),
      document: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
    },
  }),
  attendancesController.create,
);

attendancesRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      customerId: Joi.string().required(),
      lotId: Joi.string().required(),
      brokerId: Joi.string().required(),
      note: Joi.string().required(),
    },
  }),
  attendancesController.update,
);

export default attendancesRouter;
