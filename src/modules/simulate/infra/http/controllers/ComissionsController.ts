import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ComissionsService from '@modules/simulate/services/ComissionsService';

export default class ComissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const comissions = container.resolve(ComissionsService);

    const comission = await comissions.execute(req.body);

    return res.json(comission);
  }
}
