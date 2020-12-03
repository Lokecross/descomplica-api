import { Request, Response } from 'express';

import ConsultProspectService from '@modules/simulate/services/ConsultProspectService';

export default class ConsultProspectController {
  public async create(req: Request, res: Response): Promise<Response> {
    const consultProspect = new ConsultProspectService();

    const consult = await consultProspect.execute(req.body);

    return res.json(consult);
  }
}
