import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListTeamsService from '@modules/users/services/ListTeamsService';

export default class TeamsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listTeams = container.resolve(ListTeamsService);

    const teams = await listTeams.execute();

    return res.json(teams);
  }
}
