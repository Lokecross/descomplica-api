import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePayersService from '@modules/simulate/services/CreatePayersService';

export default class PayersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createPayer = container.resolve(CreatePayersService);

    const payer = await createPayer.execute({
      simulateId: id,
      ...req.body,
    });

    return res.json(payer);
  }
}
