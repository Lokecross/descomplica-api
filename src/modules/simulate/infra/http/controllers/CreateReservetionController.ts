import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateReservetionService from '@modules/simulate/services/CreateReservetionService';

export default class CreateReservetionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createReservetion = container.resolve(CreateReservetionService);

    const create = await createReservetion.execute({
      user_id: req.user.id,
      ...req.body,
    });

    return res.json(create);
  }
}
