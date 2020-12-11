import { Request, Response } from 'express';

import CreatePayerService from '@modules/simulate/services/CreatePayerService';

export default class CreatePayerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createPayer = new CreatePayerService();

    const payer = await createPayer.execute(req.body);

    return res.json(payer);
  }
}
