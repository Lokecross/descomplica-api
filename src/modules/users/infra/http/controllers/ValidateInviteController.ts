import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ValidateInviteService from '@modules/users/services/ValidateInviteService';

export default class InvitesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const validateInvite = container.resolve(ValidateInviteService);

    const invite = await validateInvite.execute(req.body);

    return res.json(invite);
  }
}
