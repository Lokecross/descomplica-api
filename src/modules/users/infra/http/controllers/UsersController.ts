import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(req.body);

    delete user.password;

    return res.json(user);
  }
}
