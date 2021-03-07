import { Request, Response } from 'express';

import { container } from 'tsyringe';

import SimulationLotService from '@modules/simulate/services/SimulationLotService';

export default class SimulationLotController {
  public async create(req: Request, res: Response): Promise<Response> {
    const simulate = container.resolve(SimulationLotService);

    const simulation = await simulate.execute(req.body);

    return res.json(simulation);
  }
}
