import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePayerService from '@modules/simulate/services/CreatePayerService';

export default class CreatePayerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPayer = container.resolve(CreatePayerService);

    const payer = await createPayer.execute(req.body);

    return res.json(payer);
  }
}
