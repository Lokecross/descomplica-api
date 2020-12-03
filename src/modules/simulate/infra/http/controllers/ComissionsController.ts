import { Request, Response } from 'express';

import ComissionsService from '@modules/simulate/services/ComissionsService';

export default class ComissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const comissions = new ComissionsService();

    const comission = await comissions.execute(req.body);

    return res.json(comission);
  }
}
