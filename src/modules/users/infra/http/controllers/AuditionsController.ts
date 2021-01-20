import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListAuditionsService from '@modules/users/services/ListAuditionsService';

export default class AuditionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAuditions = container.resolve(ListAuditionsService);

    const auditions = await listAuditions.execute();

    return res.json(auditions);
  }
}
