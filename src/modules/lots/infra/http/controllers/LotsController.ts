import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListLotsByEnterpriseService from '@modules/lots/services/ListLotsByEnterpriseService';

export default class LotsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { enterprise_id } = req.params;

    const listLots = container.resolve(ListLotsByEnterpriseService);

    const lots = await listLots.execute({ enterprise_id });

    return res.json(lots);
  }
}
