import { Request, Response } from 'express';

import { container } from 'tsyringe';

import SimulationService from '@modules/simulate/services/SimulationService';

export default class SimulationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const simulate = container.resolve(SimulationService);

    const simulation = await simulate.execute({
      simulateId: id,
    });

    return res.json(simulation);
  }
}
