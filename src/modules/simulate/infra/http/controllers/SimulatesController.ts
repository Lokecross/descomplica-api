import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateSimulateService from '@modules/simulate/services/CreateSimulateService';
import ShowSimulateService from '@modules/simulate/services/ShowSimulateService';

export default class SimulatesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createSimulate = container.resolve(CreateSimulateService);

    const simulate = await createSimulate.execute(req.body);

    return res.json(simulate);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showSimulate = container.resolve(ShowSimulateService);

    const simulate = await showSimulate.execute({
      simulateId: id,
      ...req.body,
    });

    return res.json(simulate);
  }
}
