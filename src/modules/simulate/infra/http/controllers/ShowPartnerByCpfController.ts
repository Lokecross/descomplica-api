import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ShowPartnerByCpfService from '@modules/simulate/services/ShowPartnerByCpfService';

export default class ComissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const showPartnerByCpf = container.resolve(ShowPartnerByCpfService);

    const partner = await showPartnerByCpf.execute(req.body);

    return res.json(partner);
  }
}
