import { Request, Response } from 'express';

import CreateReservetionService from '@modules/simulate/services/CreateReservetionService';

export default class CreateReservetionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createReservetion = new CreateReservetionService();

    const create = await createReservetion.execute(req.body);

    return res.json(create);
  }
}
