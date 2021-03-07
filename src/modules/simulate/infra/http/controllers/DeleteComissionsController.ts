import { Request, Response } from 'express';

import { container } from 'tsyringe';

import DeleteComissionsService from '@modules/simulate/services/DeleteComissionsService';

export default class DeleteComissionsController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteComissions = container.resolve(DeleteComissionsService);

    const comissions = await deleteComissions.execute({
      simulateId: id,
    });

    return res.json(comissions);
  }
}
