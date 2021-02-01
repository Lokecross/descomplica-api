import { Request, Response } from 'express';

import { container } from 'tsyringe';

import RefuseRequestCustomerService from '@modules/customers/services/RefuseRequestCustomerService';

export default class RefuseRequestCustomerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const refuseRequestCustomer = container.resolve(
      RefuseRequestCustomerService,
    );

    const customer = await refuseRequestCustomer.execute({
      requestCustomerId: id,
      ...req.body,
    });

    return res.json(customer);
  }
}
