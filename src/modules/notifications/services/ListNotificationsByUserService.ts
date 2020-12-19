import { injectable, inject } from 'tsyringe';

import Notification from '../infra/typeorm/entities/Notification';
import INotificationsRepository from '../repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListNotificationsByUserService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.listByUser(
      user_id,
    );

    return notifications;
  }
}

export default ListNotificationsByUserService;
