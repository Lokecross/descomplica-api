import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListCustomersByEnterpriseService from '@modules/customers/services/ListCustomersByEnterpriseService';

export default class CostumersByEnterpriseController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { enterprise_id } = req.params;

    const listCustomer = container.resolve(ListCustomersByEnterpriseService);

    const customers = await listCustomer.execute({ enterprise_id });

    return res.json(customers);
  }
}
