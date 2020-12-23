import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AmountUnitiesService from '@modules/enterprises/services/AmountUnitiesService';

export default class AmountUnitiesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const amountUnities = container.resolve(AmountUnitiesService);

    const amount = await amountUnities.execute();

    return res.json(amount);
  }
}
