import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import INotificationProvider from '@modules/notifications/providers/NotificationMobile/models/INotificationProvider';

import Notification from '../infra/typeorm/entities/Notification';

import INotificationsRepository from '../repositories/INotificationsRepository';

interface IRequest {
  heading: string;
  content: string;
  users: User[];
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  public async execute({
    heading,
    content,
    users,
  }: IRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.create({
      heading,
      content,
      users,
    });

    await this.notificationProvider.notificate(
      heading,
      content,
      users.filter(item => !!item.onesignal_id).map(item => item.onesignal_id),
    );

    return notification;
  }
}

export default CreateNotificationService;
