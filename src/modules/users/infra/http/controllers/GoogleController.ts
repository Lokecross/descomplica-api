import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserGoogleService from '@modules/users/services/AuthenticateUserGoogleService';

export default class GoogleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { googleToken } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserGoogleService);

    const { user, token } = await authenticateUser.execute({
      googleToken,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
