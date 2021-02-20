import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateComissionsService from '@modules/simulate/services/CreateComissionsService';

export default class CreateComissionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createComissions = container.resolve(CreateComissionsService);

    const comissions = await createComissions.execute({
      simulateId: id,
      ...req.body,
    });

    return res.json(comissions);
  }
}
