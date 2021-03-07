import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePayersService from '@modules/simulate/services/CreatePayersService';
import UpdatePayerService from '@modules/simulate/services/UpdatePayerService';
import DeletePayerService from '@modules/simulate/services/DeletePayerService';
import ShowPayerService from '@modules/simulate/services/ShowPayerService';

export default class PayersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showPayer = container.resolve(ShowPayerService);

    const payer = await showPayer.execute({
      payerId: id,
    });

    return res.json(payer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createPayer = container.resolve(CreatePayersService);

    const payer = await createPayer.execute({
      simulateId: id,
      ...req.body,
    });

    return res.json(payer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updatePayer = container.resolve(UpdatePayerService);

    const payer = await updatePayer.execute({
      payerId: id,
      ...req.body,
    });

    return res.json(payer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePayer = container.resolve(DeletePayerService);

    await deletePayer.execute({
      payerId: id,
    });

    return res.json({
      ok: true,
    });
  }
}
