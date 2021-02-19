import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdatePaymentDataService from '@modules/simulate/services/UpdatePaymentDataService';

export default class UpdatePaymentDataController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateSimulate = container.resolve(UpdatePaymentDataService);

    const simulate = await updateSimulate.execute({
      simulateId: id,
      ...req.body,
    });

    return res.json(simulate);
  }
}
