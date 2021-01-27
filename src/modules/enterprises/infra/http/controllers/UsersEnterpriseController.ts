import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AddUsersToEnterpriseService from '@modules/enterprises/services/AddUsersToEnterpriseService';
import DeleteUserFromEnterpriseService from '@modules/enterprises/services/DeleteUserFromEnterpriseService';

export default class UsersEnterpriseController {
  public async create(req: Request, res: Response): Promise<Response> {
    const addUser = container.resolve(AddUsersToEnterpriseService);

    const enterprise = await addUser.execute({
      id: req.params.id,
      ...req.body,
    });

    return res.json(enterprise);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserFromEnterpriseService);

    const enterprise = await deleteUser.execute({
      id: req.params.id,
      userId: req.params.userId,
    });

    return res.json(enterprise);
  }
}
