import { Request, Response } from 'express';

import { container } from 'tsyringe';

import SimulateService from '@modules/simulate/services/SimulateService';

export default class SimulateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const simulate = container.resolve(SimulateService);

    const simulation = await simulate.execute(req.body);

    return res.json(simulation);
  }
}
