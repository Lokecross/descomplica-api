import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ReserveService from '@modules/simulate/services/ReserveService';

export default class ReserveController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const reserve = container.resolve(ReserveService);

    const simulate = await reserve.execute({
      simulateId: id,
    });

    return res.json(simulate);
  }
}
