import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ConsultProspectService from '@modules/simulate/services/ConsultProspectService';

export default class ConsultProspectController {
  public async create(req: Request, res: Response): Promise<Response> {
    const consultProspect = container.resolve(ConsultProspectService);

    const consult = await consultProspect.execute(req.body);

    return res.json(consult);
  }
}
