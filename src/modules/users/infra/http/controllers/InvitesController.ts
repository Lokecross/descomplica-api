import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInviteService from '@modules/users/services/CreateInviteService';

export default class InvitesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createInvite = container.resolve(CreateInviteService);

    const invite = await createInvite.execute({
      supervisorId: req.params.id,
    });

    return res.json(invite);
  }
}
