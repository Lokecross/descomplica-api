import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ApproveRequestCustomerService from '@modules/customers/services/ApproveRequestCustomerService';

export default class ApproveRequestCustomerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const approveRequestCustomer = container.resolve(
      ApproveRequestCustomerService,
    );

    const customer = await approveRequestCustomer.execute({
      requestCustomerId: id,
    });

    return res.json(customer);
  }
}
