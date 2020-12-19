import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListEnterprisesService from '@modules/enterprises/services/ListEnterprisesService';

export default class EnterprisesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listEnterprises = container.resolve(ListEnterprisesService);

    const enterprises = await listEnterprises.execute();

    return res.json(enterprises);
  }
}
