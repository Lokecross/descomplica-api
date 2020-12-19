import Notification from '../infra/typeorm/entities/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  findById(id: string): Promise<Notification | undefined>;
  list(): Promise<Notification[]>;
  listByUser(user_id: string): Promise<Notification[]>;
  save(notification: Notification): Promise<Notification>;
}
