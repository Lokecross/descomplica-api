import { getRepository, Repository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../entities/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  public async create(reqData: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create(reqData);

    await this.ormRepository.save(notification);

    return notification;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const notification = this.ormRepository.findOne(id);

    return notification;
  }

  public async list(): Promise<Notification[]> {
    const notifications = await this.ormRepository.find();

    return notifications;
  }

  public async listByUser(user_id: string): Promise<Notification[]> {
    const notifications = await this.ormRepository
      .createQueryBuilder('notifications')
      .innerJoin('notifications.users', 'users', 'users.id = :userId', {
        userId: user_id,
      })
      .getMany();

    return notifications;
  }

  public async save(notification: Notification): Promise<Notification> {
    return this.ormRepository.save(notification);
  }
}

export default NotificationsRepository;
