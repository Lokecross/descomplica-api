import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ValidateInviteController from '../controllers/ValidateInviteController';

const invitesRouter = Router();
const validateInviteController = new ValidateInviteController();

invitesRouter.post(
  '/validate',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
    },
  }),
  validateInviteController.create,
);

export default invitesRouter;
