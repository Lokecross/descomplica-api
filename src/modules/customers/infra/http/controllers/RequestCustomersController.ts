import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateRequestCustomerService from '@modules/customers/services/CreateRequestCustomerService';
import ListRequestCustomerService from '@modules/customers/services/ListRequestCustomerService';

export default class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listRequestCustomer = container.resolve(ListRequestCustomerService);

    const requestCustomers = await listRequestCustomer.execute();

    return res.json(requestCustomers);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createRequestCustomer = container.resolve(
      CreateRequestCustomerService,
    );

    const requestCustomer = await createRequestCustomer.execute({
      user_id: req.user.id,
      ...req.body,
    });

    return res.json(requestCustomer);
  }
}
