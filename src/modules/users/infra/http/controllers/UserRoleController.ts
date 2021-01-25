import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserRoleService from '@modules/users/services/UpdateUserRoleService';

export default class UserRoleController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserRole = container.resolve(UpdateUserRoleService);

    const user = await updateUserRole.execute({
      user_id: req.params.id,
      role: req.body.role,
    });

    return res.json(user);
  }
}
