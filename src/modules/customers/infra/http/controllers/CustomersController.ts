import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';

export default class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomerService);

    const customers = await listCustomer.execute({
      userId: req.user.id,
    });

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ customer_id: id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute(req.body);

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      customer_id: id,
      ...req.body,
    });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({
      customer_id: id,
    });

    return res.json();
  }
}
