import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateOnesignalIdService from '@modules/users/services/UpdateOnesignalIdService';

export default class OnesignalController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { onesignal_id } = request.body;

    const updateProfile = container.resolve(UpdateOnesignalIdService);

    const user = await updateProfile.execute({
      user_id,
      onesignal_id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
