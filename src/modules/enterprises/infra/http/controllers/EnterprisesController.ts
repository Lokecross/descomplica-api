import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListEnterprisesService from '@modules/enterprises/services/ListEnterprisesService';
import FindEnterpriseService from '@modules/enterprises/services/FindEnterpriseService';

export default class EnterprisesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listEnterprises = container.resolve(ListEnterprisesService);

    const enterprises = await listEnterprises.execute();

    return res.json(enterprises);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showEnterprise = container.resolve(FindEnterpriseService);

    const enterprise = await showEnterprise.execute({
      id: req.params.id,
    });

    return res.json(enterprise);
  }
}
