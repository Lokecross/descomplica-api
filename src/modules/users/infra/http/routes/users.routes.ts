import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAllowed from '@modules/users/infra/http/middlewares/ensureAllowed';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserRoleController from '../controllers/UserRoleController';
import UserTeamController from '../controllers/UserTeamController';
import InvitesController from '../controllers/InvitesController';

import { roleOptions } from '../../typeorm/entities/User';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userRoleController = new UserRoleController();
const userTeamController = new UserTeamController();
const invitesController = new InvitesController();

usersRouter.get(
  '/',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  usersController.index,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      code: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.post(
  '/:id/invite',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager', 'supervisor']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  invitesController.create,
);

usersRouter.patch(
  '/:id/role',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      role: Joi.string()
        .valid(...roleOptions)
        .required(),
    },
  }),
  userRoleController.update,
);

usersRouter.patch(
  '/:id/team',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['manager']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      teamId: Joi.string().uuid().required(),
    },
  }),
  userTeamController.update,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
