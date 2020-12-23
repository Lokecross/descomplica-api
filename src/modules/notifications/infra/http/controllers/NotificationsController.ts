import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListNotificationsByUserService from '@modules/notifications/services/ListNotificationsByUserService';
import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';

export default class NotificationsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listNotifications = container.resolve(ListNotificationsByUserService);

    const notifications = await listNotifications.execute({ user_id });

    return res.json(notifications);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createNotification = container.resolve(CreateNotificationService);

    const notification = await createNotification.execute(req.body);

    return res.json(notification);
  }
}
