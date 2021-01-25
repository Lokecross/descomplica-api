import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserRoleController from '../controllers/UserRoleController';
import ensureAllowed from '../middlewares/ensureAllowed';
import { roleOptions } from '../../typeorm/entities/User';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userRoleController = new UserRoleController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/:id/role',
  ensureAuthenticated,
  (...args) => ensureAllowed(...args, ['supervisor']),
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
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
