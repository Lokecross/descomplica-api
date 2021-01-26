import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserTeamService from '@modules/users/services/UpdateUserTeamService';

export default class UserTeamController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserTeam = container.resolve(UpdateUserTeamService);

    const user = await updateUserTeam.execute({
      user_id: req.params.id,
      teamId: req.body.teamId,
    });

    return res.json(user);
  }
}
