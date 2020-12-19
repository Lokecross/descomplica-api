import { uuid } from 'uuidv4';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/entities/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create(reqData: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: uuid(), ...reqData });

    this.notifications.push(notification);

    return notification;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const findNotification = this.notifications.find(
      notification => notification.id === id,
    );

    return findNotification;
  }

  public async list(): Promise<Notification[]> {
    return this.notifications;
  }

  public async listByUser(user_id: string): Promise<Notification[]> {
    return this.notifications.filter(
      findNotification =>
        findNotification.users.findIndex(
          findUser => findUser.id === user_id,
        ) !== -1,
    );
  }

  public async save(notification: Notification): Promise<Notification> {
    const findIndex = this.notifications.findIndex(
      findNotification => findNotification.id === notification.id,
    );

    this.notifications[findIndex] = notification;

    return notification;
  }
}

export default FakeNotificationsRepository;
